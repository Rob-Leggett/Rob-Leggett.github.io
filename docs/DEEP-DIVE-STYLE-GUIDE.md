# Robert Leggett's Deep-Dive Blog Post Style Guide

## Overview
Robert Leggett maintains a consistent, professional style across all deep-dive blog posts. These are comprehensive technical articles (10-20 min reading time, suitable for intermediate to advanced audiences) that dive deep into complex technical topics.

---

## 1. FRONTMATTER (YAML) FORMAT

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
  description: "[Concise 1-sentence description with key terms]"
  keywords: ["Keyword1", "Keyword2", "Keyword3", "Keyword4", "Keyword5", "Robert Leggett"]
  author: "Robert Leggett"
  canonical: "https://robertleggett.com.au/blog/[slug]"
  image: "https://robertleggett.com.au/blog/[slug]/feature-image.png"

og:
  type: "article"
  title: "[Title]"
  description: "[2-3 sentence description of the article scope]"
  image: "https://robertleggett.com.au/blog/[slug]/feature-image.png"
  url: "https://robertleggett.com.au/blog/[slug]"

twitter:
  card: "summary_large_image"
  title: "[Title]"
  description: "[Concise summary from feature perspective]"
  image: "https://robertleggett.com.au/blog/[slug]/feature-image.png"
---
```

**Key Notes:**
- Title format: ALWAYS "Deep Dive - [Topic]"
- Tags should include 8-9 relevant tags plus "Robert Leggett" as the last tag
- Feature image path follows pattern: `/blog/[slug]/feature-image.png`
- All image URLs use full canonical URL starting with `https://robertleggett.com.au/blog/`
- meta.description is concise (one sentence with key terms)
- og.description is 2-3 sentences describing the full scope
- twitter.description is brief and marketing-focused

---

## 2. OPENING PARAGRAPH (Post-Frontmatter)

**Format & Style:**

```
Welcome to the [deep dive/Deep Dive] series! In this comprehensive exploration, we will immerse ourselves in the [topic area] — [1-2 sentence problem/opportunity description with specific context]. Whether you are [audience segment 1] or [audience segment 2], our goal is to provide [specific value proposition about clarity and understanding]. [Optional context sentence about why this matters]. Join us on this [adjective] journey as we [action phrase describing what you'll learn together]. Let's [get started/dive in/demystify...].
```

**Exact Example Structure:**
- Opens with "Welcome to the deep dive series!"
- Describes the topic with a direct dash
- Identifies 2 audience segments (e.g., "experienced engineer" vs "someone just beginning")
- States the goal about clarity and understanding
- Optional: context about real-world impact or statistics
- Ends with an inspiring call to join the journey
- Final phrase: "Let's get started" or "Let's dive in" or "Let's [verb] together"

**Key Characteristics:**
- Warm, welcoming tone
- Emphasizes breadth ("comprehensive exploration," "immerse ourselves")
- Uses second-person ("our," "us," "you")
- Action-oriented verbs: "immerse," "unravel," "explore," "demystify," "bridge the gap"
- 3-4 sentences, flowing naturally
- No bullet points in opening paragraph

---

## 3. "BEFORE YOU START" SECTION

**Exact Format:**

```markdown
## Before you start

About this post:

*   10 – 20-min average reading time
*   Suitable for intermediate through to advanced

What you will gain reading this post:

*   [Benefit 1 — specific learnings]
*   [Benefit 2 — specific learnings]
*   [Benefit 3 — specific learnings]
*   [Benefit 4 — optional, specific learnings]

What you can do to help support:

*   **Like, comment and share this article**
*   **Follow this blog** to receive notifications of new postings

Now, let's get started.

---
```

**Key Notes:**
- Always a level-2 heading (`## Before you start`)
- Three subsections with bullet points (NOT bold headers)
- First subsection: Always "10 – 20-min" and "Suitable for intermediate through to advanced"
- Second subsection: "What you will gain" lists 3-4 specific, actionable benefits
- Third subsection: Always exactly these two items in bold
- Ends with "Now, let's get started." followed by horizontal rule (`---`)

---

## 4. H2 SECTION STRUCTURE

**Naming Convention:**
- Phrased as questions: "How does X work?" "What is Y?" "Why do we need Z?"
- OR: Declarative statements: "The Evolution of X" "Core Concepts of Y"
- H3 subsections for related subtopics or deep dives into specific areas

**Opening Pattern:**
Each H2 typically opens with 1-3 sentences introducing the concept, often with a definition or context-setting statement.

**Example Flow:**
```markdown
## What is Infrastructure as Code?

[Definition sentence]. [Key point 1: declarative vs imperative]. [Key point 2: idempotency]. [Context: why it matters at scale].

---

## How has IaC evolved?

The journey to modern Infrastructure as Code has passed through several distinct eras...

[Content with H3 subsections]
```

**Separation:**
- Each major H2 section typically ends with a horizontal rule (`---`)
- This creates visual breaks between sections

---

## 5. CODE BLOCK FORMAT

**Markdown Code Fences:**
- Use triple backticks with language identifier: ` ```language `
- Language identifiers used: `hcl`, `yaml`, `typescript`, `python`, `bash`, `json`, etc.
- Code blocks are typically 10-40 lines
- Longer files are excerpted with context

**Examples:**

````markdown
```hcl
resource "aws_s3_bucket" "main" {
  bucket = "my-organisation-data-bucket"

  tags = {
    Environment = "production"
    ManagedBy   = "terraform"
  }
}
```
````

````markdown
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-application
spec:
  containers:
    - name: app
      image: my-org/my-application:1.4.2
      resources:
        requests:
          cpu: "250m"
          memory: "256Mi"
```
````

**Post-Code Content:**
- Code blocks are often followed by:
  - Explanatory text
  - Command output (in ` ``` ` without language identifier)
  - A transition paragraph

---

## 6. IMAGE REFERENCE FORMAT

**Markdown Image Syntax:**
```markdown
![Descriptive alt text describing what the image shows](/blog/[slug]/[filename].png)

[Image Caption In Title Case]
```

**Key Patterns:**
- Alt text is comprehensive and descriptive (what does the image show and why)
- Image path: `/blog/[slug]/inline-1.png`, `inline-2.png`, etc. for inline images
- Immediately after the image (same paragraph or next line), provide a caption
- Captions are in title case and bold when important
- Example: `**Infrastructure as Code Evolution Timeline**`

**Specific Examples:**
```markdown
![Infrastructure as Code evolution timeline from manual provisioning to modern programmatic approaches](/blog/deep-dive-infrastructure-as-code-at-scale/inline-1.png)

IaC Evolution Timeline
```

```markdown
![Quality of Service class decision tree showing how Kubernetes assigns Guaranteed, Burstable, or BestEffort](/blog/deep-dive-kubernetes-cost-optimisation/inline-2.png)

QoS Class Decision Tree
```

---

## 7. CLOSING SECTION FORMAT

**Exact Format:**

```markdown
## Finally, we made it, did this help?

If you found this to be helpful, have any questions or want to provide feedback, please let me know.

Don't worry if all of this seems overwhelming.

*   **Like, comment and share this article**
*   **Follow this blog** to receive notifications of new postings
*   **View** [previous postings](https://robertleggett.com.au/)
```

**Key Notes:**
- Always a level-2 heading: `## Finally, we made it, did this help?`
- Opening line: "If you found this to be helpful..."
- Reassurance line: "Don't worry if all of this seems overwhelming."
- Three action items in bold (Like/comment/share, Follow, View previous)
- Final link goes to main blog: `https://robertleggett.com.au/`
- No horizontal rule before this section
- This is the final section — no additional content after

---

## 8. MDX COMPONENTS & FEATURES

**Findings:**
- Code blocks with language identifiers (hcl, yaml, typescript, python, bash, json)
- Import statements for code examples (these are WITHIN code blocks, not actual MDX imports)
- Markdown images with relative paths
- NO custom React components observed (no `<Component>` tags)
- NO MDX-specific imports at the top of files
- Pure Markdown with embedded code examples

**What's NOT Used:**
- No React JSX components
- No custom shortcodes
- No frontmatter imports
- Standard markdown only

---

## 9. TONE & VOICE

**Key Characteristics:**
- **Professional but accessible** — Uses clear language while maintaining technical depth
- **Warm and welcoming** — "we" language, invites reader on a journey
- **Confident and authoritative** — Clear explanations, definitive statements
- **Comprehensive but focused** — Covers depth without overwhelming
- **Narrative flow** — Tells a story (why → what → how)
- **Specific and concrete** — Includes real examples, code, actual values
- **No marketing jargon** — Avoids hype, sticks to facts
- **Conversational headers** — Questions and direct statements
- **Supportive closing** — Acknowledges complexity, invites engagement

**Word Choices:**
- "immerse ourselves" (opening pattern)
- "demystify" (common closing pattern)
- "Let's dive in" / "Let's get started"
- "don't worry if X seems overwhelming"
- "the good news is..." (when introducing helpful concepts)
- "at scale" (repeated throughout, emphasizes real-world context)

**Sentence Structure:**
- Mix of short and long sentences
- Complex ideas broken into digestible paragraphs
- Frequent use of em dashes (—) for emphasis
- Bullet points for lists and comparisons

---

## 10. TERMINOLOGY/DEFINITION SECTIONS

**Format Pattern:**

```markdown
## Okay, what terminology do I need to understand?

### [Term 1]

[1-3 sentence definition/explanation]

### [Term 2]

[1-3 sentence definition/explanation]

### [Term 3]

[1-3 sentence definition/explanation]
```

**Key Characteristics:**
- Always a level-2 heading with opening phrase: `## Okay, what terminology do I need to understand?`
- H3 subheadings for each term (bold at start of term is NOT used, just the H3)
- Each term gets 1-3 sentences of clear, concise definition
- Definitions are practical and context-aware (not dictionary-style)
- Typically 10-15 terms total
- This section appears BEFORE the closing section (usually second-to-last section)
- Covers terms from the entire article

**Example:**

```markdown
### Idempotency

The property that applying the same operation multiple times produces the same result as applying it once. Running `terraform apply` on an unchanged configuration should produce no changes.

### Desired State

The infrastructure configuration as defined in your IaC code — what you *want* your infrastructure to look like.

### Drift

The divergence between your desired state (code) and the actual state (reality). Drift indicates that something changed outside of your IaC workflow.
```

---

## 11. ARTICLE STRUCTURE TEMPLATE

```
1. Frontmatter (YAML)
2. Opening Welcome Paragraph
3. ## Before you start (with subsections)
4. --- (separator)
5. ## Main Topic Definition/Concept 1 (with H3s)
6. --- (separator)
7. ## Historical Context / Evolution (optional but common)
8. --- (separator)
9. ## [Topic 2 - Usually comparison or deep dive]
10. --- (separator)
11. [Multiple additional sections covering subtopics]
12. [Mid-content terminology section sometimes appears]
13. --- (separator)
14. ## Okay, what terminology do I need to understand?
15. --- (optional)
16. ## Finally, we made it, did this help?
```

**Typical Section Count:** 15-20+ main H2 sections
**Typical Article Length:** 700-900+ lines of MDX

---

## 12. QUICK REFERENCE CHECKLIST

- [ ] Frontmatter includes all 5 sections (title, meta, og, twitter, tags)
- [ ] Title formatted as "Deep Dive - [Topic]"
- [ ] Opening paragraph starts with "Welcome to the deep dive series!"
- [ ] "Before you start" section with exact format and subsections
- [ ] All major sections separated by `---`
- [ ] H2 section headings are questions or declarative statements
- [ ] Code blocks include language identifiers
- [ ] Images use `/blog/[slug]/inline-N.png` path format
- [ ] Image captions provided below each image
- [ ] Alt text on images is descriptive and informative
- [ ] Terminology section titled "Okay, what terminology do I need to understand?"
- [ ] Closing section titled "Finally, we made it, did this help?"
- [ ] No custom React components
- [ ] Tone is warm, professional, and comprehensive
- [ ] Article is 10-20 minute read (typically 700-900+ lines)

---

## EXAMPLE SECTIONS FROM REAL ARTICLES

### Opening Paragraph Example (Vector Databases):
```
Welcome to the "Deep Dive" series! In this comprehensive exploration, we will immerse ourselves 
in the world of vector databases and embeddings — the foundational technology powering modern AI 
search, recommendation systems, and Retrieval Augmented Generation (RAG). Whether you are an 
experienced engineer building production AI systems or someone just beginning to explore how 
machines understand language and meaning, our goal is to provide clear and thorough explanations 
that will deepen your understanding of how unstructured data is transformed into searchable, 
high-dimensional vector representations. We will journey from the mathematical foundations of 
vectors and embeddings, through the clever indexing algorithms that make similarity search fast 
at scale, all the way to production-ready architectures and real-world code examples. Join us on 
this enlightening journey as we bridge the gap between traditional databases and the new paradigm 
of semantic search, empowering you to build intelligent systems that truly understand the meaning 
behind your data. Let's dive in and demystify the world of vector databases together.
```

### Before You Start Example (Kubernetes):
```
## Before you start

About this post:

*   10 – 20-min average reading time
*   Suitable for intermediate through to advanced

What you will gain reading this post:

*   A comprehensive understanding of the Kubernetes resource model, autoscaling strategies, 
    node provisioning with Karpenter, spot instance economics, and FinOps practices for 
    tracking and allocating costs

What you can do to help support:

*   **Like, comment and share this article**
*   **Follow this blog** to receive notifications of new postings

Now, let's get started.
```

### Image Example (Infrastructure as Code):
```
![Infrastructure as Code evolution timeline from manual provisioning to modern programmatic approaches](/blog/deep-dive-infrastructure-as-code-at-scale/inline-1.png)

IaC Evolution Timeline
```

### Terminology Section Example (Kubernetes):
```
## Okay, what terminology do I need to understand?

### Requests

The minimum amount of CPU or memory guaranteed to a container. Used by the scheduler 
for placement decisions.

### Limits

The maximum amount of CPU or memory a container is allowed to consume. Exceeding memory 
limits results in OOMKill; exceeding CPU limits results in throttling.

### QoS Class

The Quality of Service classification (Guaranteed, Burstable, BestEffort) assigned to 
a pod based on its resource configuration. Determines eviction priority.
```

---

## FILES ANALYZED

1. `/Users/robertleggett/Projects/personal/Rob-Leggett/content/publish/deep-dive-infrastructure-as-code-at-scale.mdx` (916 lines)
2. `/Users/robertleggett/Projects/personal/Rob-Leggett/content/publish/deep-dive-vector-databases.mdx` (732 lines)
3. `/Users/robertleggett/Projects/personal/Rob-Leggett/content/publish/deep-dive-kubernetes-cost-optimisation.mdx` (748 lines)

