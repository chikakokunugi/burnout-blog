import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// ─────────────────────────────────────
// 体験 — 自分の燃え尽き経験(時系列)
// ─────────────────────────────────────
const experience = defineCollection({
	loader: glob({ base: './src/content/experience', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),                                           // 投稿日(管理用)
			updatedDate: z.coerce.date().optional(),
			eventDate: z.coerce.date(),                                          // 出来事の日付(時系列ソート)
			episode: z.enum(['episode-teen', 'episode-adult']),                  // 10代の燃え尽き / 40歳の燃え尽き
			phase: z.enum(['hope', 'strain', 'onset', 'coping', 'recovery']),    // 希望 / 不具合 / 発症 / 低空飛行 / 回復
			tags: z.array(z.string()).default([]),
			heroImage: z.optional(image()),
		}),
});

// ─────────────────────────────────────
// 基礎知識 — バーンアウトの定義・書籍・有名な研究の紹介
// ─────────────────────────────────────
const basics = defineCollection({
	loader: glob({ base: './src/content/basics', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			kind: z.enum(['definition', 'book', 'study', 'overview']).optional(), // 定義 / 書籍 / 研究 / 概論
			sourceTitle: z.string().optional(),                                   // 引用元タイトル
			sourceAuthor: z.string().optional(),                                  // 著者名
			sourceUrl: z.string().url().optional(),                               // 関連URL
			sourceYear: z.number().optional(),                                    // 発表年・出版年
			tags: z.array(z.string()).default([]),
			heroImage: z.optional(image()),
		}),
});

// ─────────────────────────────────────
// 知見 — 自分の考察・まとめ
// ─────────────────────────────────────
const insight = defineCollection({
	loader: glob({ base: './src/content/insight', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()).default([]),
			heroImage: z.optional(image()),
		}),
});

export const collections = { experience, basics, insight };