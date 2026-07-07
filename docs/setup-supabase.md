# Supabase 一次性设置

## 1. 建表
打开 Supabase 项目 → SQL Editor，粘贴跑以下 SQL：

```sql
-- 启用 pgvector 扩展
create extension if not exists vector;

-- documents 表（MiniMax embo-01 维度 = 1536）
create table documents (
  id bigserial primary key,
  content text not null,
  embedding vector(1536),
  metadata jsonb,
  created_at timestamptz default now()
);

-- 向量索引
create index documents_embedding_idx on documents using ivfflat (embedding vector_cosine_ops) with (lists = 100);
```

## 2. 建 RPC 函数

```sql
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
$$;
```

## 3. 验证

跑完 SQL 后，在 Supabase Table Editor 应该能看到 `documents` 表。
