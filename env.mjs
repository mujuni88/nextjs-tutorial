import {z} from 'zod'

// Define the shape of server environment variables
export const server = z.object({
    API_KEY: z.string(),
    PLANETSCALE_DB: z.string(),
    PLANETSCALE_DB_HOST: z.string(),
    PLANETSCALE_DB_USERNAME: z.string(),
    PLANETSCALE_DB_PASSWORD: z.string(),
    GITHUB_ID: z.string(),
    GITHUB_SECRET: z.string(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET:
        process.env.NODE_ENV === "production"
            ? z.string().min(1)
            : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
        // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
        // Since NextAuth.js automatically uses the VERCEL_URL if present.
        (str) => process.env.VERCEL_URL ?? str,
        // VERCEL_URL doesn't include `https` so it cant be validated as a URL
        process.env.VERCEL ? z.string().min(1) : z.string().url()
    ),
})

// Define the shape of client environment variables
export const client = z.object({
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
})

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
    API_KEY: process.env.API_KEY,
    PLANETSCALE_DB_HOST: process.env.PLANETSCALE_DB_HOST,
    PLANETSCALE_DB_USERNAME: process.env.PLANETSCALE_DB_USERNAME,
    PLANETSCALE_DB_PASSWORD: process.env.PLANETSCALE_DB_PASSWORD,
    PLANETSCALE_DB: process.env.PLANETSCALE_DB,
    NODE_ENV: process.env.NODE_ENV,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
};

// Don't touch the part below
// --------------------------

const merged = server.merge(client);

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env);

if (!!process.env.SKIP_ENV_VALIDATION == false) {
    const isServer = typeof window === "undefined";

    const parsed = /** @type {MergedSafeParseReturn} */ (
        isServer
            ? merged.safeParse(processEnv) // on server we can validate all env vars
            : client.safeParse(processEnv) // on client we can only validate the ones that are exposed
    );

    if (parsed.success === false) {
        console.error(
            "❌ Invalid environment variables:",
            parsed.error.flatten().fieldErrors
        );
        throw new Error("Invalid environment variables");
    }

    env = new Proxy(parsed.data, {
        get(target, prop) {
            if (typeof prop !== "string") return undefined;
            // Throw a descriptive error if a server-side env var is accessed on the client
            // Otherwise it would just be returning `undefined` and be annoying to debug
            if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
                throw new Error(
                    process.env.NODE_ENV === "production"
                        ? "❌ Attempted to access a server-side environment variable on the client"
                        : `❌ Attempted to access server-side environment variable '${prop}' on the client`
                );
            return target[/** @type {keyof typeof target} */ (prop)];
        },
    });
}

export {env};