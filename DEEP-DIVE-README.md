# Deep-Dive Blog Post Style Guide - Documentation Summary

This directory now contains comprehensive documentation on Robert Leggett's deep-dive blog post style, format, and MDX structure.

## 📚 Documentation Files Created

### 1. **DEEP-DIVE-MASTER-GUIDE.md** ⭐ START HERE
The comprehensive master guide covering everything you need to write a new deep-dive post.

**Contains:**
- Executive summary
- Complete frontmatter template (YAML format)
- All 8 critical formatting requirements
- Tone and voice guide
- Complete article structure template
- Pre-publication checklist (30+ items)
- MDX technical notes
- Common patterns used across posts
- Writing tips and best practices

**Use this as:** Your primary reference when writing a new deep-dive post

---

### 2. **DEEP-DIVE-STYLE-GUIDE.md**
Detailed markdown-formatted style guide with numbered sections.

**Contains:**
- 12 detailed sections covering all format elements
- Code examples for each format pattern
- Exact wording requirements (e.g., "Now, let's get started.")
- Terminology section format with examples
- Article structure template
- Quick reference checklist
- Real examples from published posts

**Use this as:** Your detailed reference for specific formatting questions

---

### 3. **DEEP-DIVE-EXAMPLES.md**
Real, extracted examples from published deep-dive posts.

**Contains:**
- 14 complete real-world examples
- Opening paragraphs (exact formats)
- Code blocks in multiple languages (HCL, YAML, TypeScript, Python, Bash)
- Image references with alt text and captions
- H3 subsections with bullet points
- Terminology section examples
- Comparison tables
- Mathematical formulas
- Summary of consistent patterns across all posts

**Use this as:** Your reference library when unsure how to format something

---

## 🎯 Quick Reference

### Most Important Format Rules (In Priority Order)

1. **Title MUST be:** "Deep Dive - [Topic]"
2. **Opening paragraph MUST start with:** "Welcome to the deep dive series!"
3. **"Before you start" section uses exact 3 subsections** with specific bullet points
4. **Closing section MUST be:** "## Finally, we made it, did this help?"
5. **Terminology section MUST be:** "## Okay, what terminology do I need to understand?"
6. **Every H2 section MUST end with** `---` (horizontal rule)
7. **Code blocks MUST have language identifiers** (hcl, yaml, typescript, python, bash, json)
8. **All images MUST have** alt text + caption
9. **Frontmatter MUST include** all 5 sections: title, meta, og, twitter, tags
10. **Tags MUST be 9 items** with "Robert Leggett" as the last item

---

## 📋 Frontmatter Template (Copy & Paste)

```yaml
---
title: "Deep Dive - [Topic Name]"
date: "YYYY-MM-DD"
slug: "deep-dive-[kebab-case-topic]"
status: "publish"
feature_image: "/blog/deep-dive-[slug]/feature-image.png"
tags: ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5", "Tag6", "Tag7", "Tag8", "Robert Leggett"]

meta:
  title: "[Title] | Robert Leggett"
  description: "A comprehensive deep dive into [topic] — covering [main subtopics]."
  keywords: ["Keyword1", "Keyword2", "Keyword3", "Keyword4", "Keyword5", "Robert Leggett"]
  author: "Robert Leggett"
  canonical: "https://robertleggett.com.au/blog/[slug]"
  image: "https://robertleggett.com.au/blog/[slug]/feature-image.png"

og:
  type: "article"
  title: "Deep Dive - [Topic Name]"
  description: "A comprehensive deep dive into [topic] — covering [main subtopics] and production strategies."
  image: "https://robertleggett.com.au/blog/[slug]/feature-image.png"
  url: "https://robertleggett.com.au/blog/[slug]"

twitter:
  card: "summary_large_image"
  title: "Deep Dive - [Topic Name]"
  description: "[Concise 1-line summary of the topic and what readers will learn]."
  image: "https://robertleggett.com.au/blog/[slug]/feature-image.png"
---
```

---

## 📐 Standard Section Structure

### Opening Section
```
[No heading - just text after frontmatter]

Welcome to the deep dive series! In this comprehensive exploration, we will 
immerse ourselves in [topic] — [problem/opportunity]. Whether you are 
[audience 1] or [audience 2], our goal is to provide [value]. 
[Optional: context sentence]. Join us on this [adjective] journey as we 
[action]. Let's [get started/dive in].
```

### Before You Start Section
```
## Before you start

About this post:

*   10 – 20-min average reading time
*   Suitable for intermediate through to advanced

What you will gain reading this post:

*   [Specific benefit 1]
*   [Specific benefit 2]
*   [Specific benefit 3]

What you can do to help support:

*   **Like, comment and share this article**
*   **Follow this blog** to receive notifications of new postings

Now, let's get started.

---
```

### Main Content Section Pattern
```
## What is [Topic]? / How does [Topic] work?

[1-3 sentence definition/context]

### Subsection Name

[Content]

```language
code example
```

---
```

### Terminology Section
```
## Okay, what terminology do I need to understand?

### Term 1

[1-3 sentence definition]

### Term 2

[1-3 sentence definition]

---
```

### Closing Section
```
## Finally, we made it, did this help?

If you found this to be helpful, have any questions or want to provide feedback, 
please let me know.

Don't worry if all of this seems overwhelming.

*   **Like, comment and share this article**
*   **Follow this blog** to receive notifications of new postings
*   **View** [previous postings](https://robertleggett.com.au/)
```

---

## 🔍 Published Deep-Dive Posts (Reference)

These are the posts analyzed to create this guide:

1. **Deep Dive - Infrastructure as Code at Scale** (916 lines)
   - File: `content/publish/deep-dive-infrastructure-as-code-at-scale.mdx`
   - Topics: Terraform, CloudFormation, CDK, Pulumi, state management, IaC patterns

2. **Deep Dive - Vector Databases and Embeddings** (732 lines)
   - File: `content/publish/deep-dive-vector-databases.mdx`
   - Topics: Embeddings, similarity metrics, indexing algorithms, RAG, chunking

3. **Deep Dive - Kubernetes Cost Optimisation** (748 lines)
   - File: `content/publish/deep-dive-kubernetes-cost-optimisation.mdx`
   - Topics: Resource model, QoS, HPA/VPA/Karpenter, spot instances, FinOps

Plus 8 additional published deep-dive posts in the same series.

---

## ✅ Pre-Write Checklist

Before starting a new deep-dive post, ensure you have:

- [ ] DEEP-DIVE-MASTER-GUIDE.md open for reference
- [ ] Topic clearly defined with target audience in mind
- [ ] Main sections/H2 topics outlined (typically 15-20+ sections)
- [ ] Code examples planned (5-15+ throughout)
- [ ] Images identified/designed (3-8+ with captions)
- [ ] Terminology list started (10-15 key terms)
- [ ] Opening paragraph draft (warm, welcoming)
- [ ] Reading time estimate (target 10-20 minutes)
- [ ] Audience level clear (intermediate through advanced)

---

## 🎨 Tone Examples

### ✅ GOOD - Warm & Professional
> Welcome to the deep dive series! In this comprehensive exploration, we will immerse 
> ourselves in the intricacies of Kubernetes cost optimisation, unraveling the strategies, 
> tools, and architectural patterns that enable organisations to dramatically reduce their 
> cloud spend without sacrificing performance or reliability. Whether you are a platform 
> engineer, a DevOps practitioner, or a technical leader seeking to understand where your 
> Kubernetes budget is going, our goal is to provide clear and actionable explanations 
> that will enhance your understanding of the full cost optimisation landscape.

### ❌ BAD - Stiff & Impersonal
> This article covers Kubernetes cost optimization techniques. We will discuss resource 
> management, autoscaling, and cost tracking. The article is suitable for intermediate users.

### ✅ GOOD - Specific & Actionable
> Set resource requests as close to actual usage as possible — use VPA recommendations as 
> your baseline. Avoid specifying only limits without requests (this defaults requests to 
> limits, often over-allocating).

### ❌ BAD - Vague & Uncertain
> Resource management is important. You might want to set requests carefully. Limits could 
> be useful too.

---

## 📝 Writing Process Recommended

1. **Outline** (30 mins)
   - List main H2 sections (15-20+)
   - Identify 3-4 code examples
   - Plan terminology section

2. **Draft** (3-4 hours)
   - Write opening paragraph
   - Write "Before you start" section
   - Draft main content sections with H3s
   - Add terminology section

3. **Code & Examples** (1-2 hours)
   - Add code blocks with language identifiers
   - Add command examples where relevant
   - Verify code syntax and formatting

4. **Images & Polish** (1 hour)
   - Add image references with alt text and captions
   - Add horizontal rules between sections
   - Ensure consistent formatting

5. **Final Review** (1-2 hours)
   - Use pre-publication checklist
   - Check tone and voice
   - Verify all formatting
   - Test code examples
   - Proofread for typos

**Total Time Estimate:** 6-10 hours for a complete deep-dive post

---

## 🚀 Quick Start

1. **Read** `DEEP-DIVE-MASTER-GUIDE.md` (20 mins)
2. **Copy** the Frontmatter Template above
3. **Reference** `DEEP-DIVE-EXAMPLES.md` for specific format questions
4. **Check** against Pre-Publication Checklist before submitting
5. **Done!** Your post is ready to follow Robert's exact style

---

## 📞 Questions?

Refer to the appropriate guide:

- **"How should the opening paragraph look?"** → See DEEP-DIVE-EXAMPLES.md, Example 1
- **"What's the exact format for images?"** → See DEEP-DIVE-MASTER-GUIDE.md, Section 6
- **"How many terms in the terminology section?"** → See DEEP-DIVE-MASTER-GUIDE.md, Section 7
- **"What should my frontmatter look like?"** → See Frontmatter Template above
- **"What tone should I use?"** → See DEEP-DIVE-MASTER-GUIDE.md, Tone & Voice Guide

---

**Version:** 1.0  
**Created:** 2025-01-15  
**Based on:** Analysis of 11+ published deep-dive posts (2,396+ lines of reference material)  
**Covers:** Frontmatter, structure, formatting, tone, MDX, and best practices
