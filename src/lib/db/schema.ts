import { pgTable, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  technologies: text('technologies').array().notNull(),
  image: text('image').notNull(),
  github: text('github'),
  demo: text('demo'),
  featured: boolean('featured').default(false),
  published: boolean('published').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  author: text('author').notNull(),
  publishedAt: timestamp('published_at').defaultNow(),
  tags: text('tags').array().notNull(),
  featured: boolean('featured').default(false),
  published: boolean('published').default(true),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});