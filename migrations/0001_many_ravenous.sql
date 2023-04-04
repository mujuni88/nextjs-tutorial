ALTER TABLE posts ADD `authorId` text NOT NULL;
ALTER TABLE posts ADD CONSTRAINT posts_authorId_users_id_fk FOREIGN KEY (`authorId`) REFERENCES users(`id`) ;