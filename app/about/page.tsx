import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'About Joe Buza',
  description: 'About Joe Buza',
}

export default function About(){
  return <div className="text-3xl font-bold underline">About Joe Buza </div>
}