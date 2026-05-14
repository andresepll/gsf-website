# Supabase setup

## Apply the schema

1. Open the Supabase dashboard for the GSF project.
2. SQL Editor → New query.
3. Paste the contents of `schema.sql` and run.
4. Verify in Table Editor: `complaints` table exists with the expected columns.

## Verify RLS posture

In SQL Editor, run:

```sql
select tablename, rowsecurity
from pg_tables
where schemaname = 'public' and tablename = 'complaints';
```

Expect `rowsecurity = true`.

Then check that **no policies** exist:

```sql
select policyname, roles, cmd
from pg_policies
where schemaname = 'public' and tablename = 'complaints';
```

Expect zero rows. The route handler authenticates with `SERVICE_ROLE_KEY`, which bypasses RLS — so no policies are needed for the current write path. RLS is enabled as defense in depth in case the anon key is ever used against this table.

## When `/admin/complaints` is built

Do NOT add a blanket `for select using (true)` policy. Instead:

1. Decide on the admin auth mechanism (Supabase Auth, NextAuth + custom claim, IP allowlist, etc).
2. Add a narrowly-scoped policy keyed on the admin claim, e.g.

```sql
create policy admin_read on public.complaints
  for select
  to authenticated
  using (auth.jwt() ->> 'role' = 'gsf_admin');
```

3. Update `schema.sql` in this repo so the change is versioned.
