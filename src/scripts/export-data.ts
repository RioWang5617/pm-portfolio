/// <reference types="node" />
// 把 src/data/*.ts 导出为 src/data.json，给后端 ingest 用
import { writeFileSync } from 'fs'
import { profile } from '../data/profile'
import { works } from '../data/works'
import { demos } from '../data/vibecoding'

const out = {
  profile,
  works: works.map((w) => ({
    slug: w.slug,
    title: w.title,
    subtitle: w.subtitle,
    year: w.year,
    role: w.role,
    team: w.team,
    intro: w.intro,
    context: w.context,
    problem: w.problem,
    approach: w.approach,
    outcome: w.outcome,
    reflection: w.reflection,
  })),
  demos: demos.map((d) => ({
    slug: d.slug,
    title: d.title,
    subtitle: d.subtitle,
    year: d.year,
    effort: d.effort,
    stack: d.stack,
    motivation: d.motivation,
    build: d.build,
    whatILearned: d.whatILearned,
  })),
}

writeFileSync('src/data.json', JSON.stringify(out, null, 2), 'utf-8')
console.log('Exported src/data.json')
