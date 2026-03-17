# Robert Leggett's Deep-Dive Blog Post Format & Style Guide

## Executive Summary

Robert Leggett maintains a highly consistent, professional format across all 11+ deep-dive blog posts. These comprehensive technical articles (10-20 minute reads for intermediate to advanced audiences) follow a strict structure with warm, inclusive tone and specific formatting requirements. This guide documents everything needed to create new deep-dive posts that match the existing style.

**Key Files to Reference:**
- Source posts location: `/content/publish/deep-dive-*.mdx`
- Sample posts analyzed: Infrastructure as Code, Vector Databases, Kubernetes Cost Optimisation

---

## CRITICAL FORMATTING REQUIREMENTS

### 1. FRONTMATTER (Exact YAML Format)

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
  description: "[Concise 1-sentence description]"
  keywords: ["Keyword1", "Keyword2", "Keyword3", "Keyword4", "Keyword5", "Robert Leggett"]
  author: "Robert Leggett"
  canonical: "https://robertleggett.com.au/blog/[slug]"
  image: "https://robertleggett.com.au/blog/[slug]/feature-image.png"

og:
  type: "article"
  title: "[Title]"
  description: "[2-3 sentence description]"
  image: "https://robertleggett.com.au/blog/[slug]/feature-image.png"
  url: "https://robertleggett.com.au/blog/[slug]"

twitter:
  card: "summary_large_image"
  title: "[Title]"
  description: "[Concise summary]"
  image: "https://robertleggett.com.au/blog/[slug]/feature-image.png"
---
```

**Critical Points:**
- Title MUST be "Deep Dive - [Topic]"
- slug MUST be "deep-dive-[kebab-case]"
- tags MUST have exactly 9 items, last item ALWAYS "Robert Leggett"
- Feature image path: `/blog/[slug]/feature-image.png`
- meta.keywords and meta.description are different (keywords is list, description is single sentence)
- All image URLs use full canonical URL

### 2. OPENING PARAGRAPH (Post-Frontmatter, Pre-"Before You Start")

**Required Structure:**
```
Welcome to the deep dive series! In this comprehensive exploration, we will 
immerse ourselves in [topic area] — [problem/opportunity]. Whether you are 
[audience 1] or [audience 2], our goal is to provide [value proposition]. 
[Optional context about real-world impact]. Join us on this [adjective] 
journey as we [action]. Let's [get started/dive in/demystify...].
```

**Exact Example:**
```
Welcome to the deep dive series! In this comprehensive exploration, we will 
immerse ourselves in the intricacies of Infrastructure as Code (IaC), unravelling 
its evolution, tooling, patterns, and the operational challenges that emerge when 
you move beyond a handful of resources to managing hundreds — or thousands — of 
infrastructure components across multiple accounts and regions. Whether you are 
beginning your IaC journey or looking to refine your approach at enterprise scale, 
our goal is to provide clear and practical explanations that will deepen your 
understanding. Join us on this deep dive as we demystify how modern organisations 
define, provision, test, and govern their infrastructure as code. Let's get started.
```

**Key Characteristics:**
- 3-4 flowing sentences
- Opens with exact phrase: "Welcome to the deep dive series!"
- Uses "immerse ourselves in"
- Addresses 2 audience segments (experienced vs beginner)
- Ends with encouraging action: "Let's get started" or "Let's dive in"
- NO bullet points
- Warm, inclusive second-person tone

### 3. BEFORE YOU START SECTION (Exact Format)

```markdown
## Before you start

About this post:

*   10 – 20-min average reading time
*   Suitable for intermediate through to advanced

What you will gain reading this post:

*   [Specific benefit with context]
*   [Specific benefit with context]
*   [Specific benefit with context]
*   [Optional - 4th benefit]

What you can do to help support:

*   **Like, comment and share this article**
*   **Follow this blog** to receive notifications of new postings

Now, let's get started.

---
```

**Critical Points:**
- H2 heading: `## Before you start`
- First subsection uses bullet points (NOT bold headers)
- "10 – 20-min" (uses en-dash, not hyphen)
- "Suitable for intermediate through to advanced" (exact wording)
- 3-4 specific benefits listed
- Support section uses bold for action items
- Ends with horizontal rule `---`

### 4. MAIN CONTENT SECTIONS

**H2 Header Naming:**
- Questions: "What is X?", "How does Y work?", "Why do we need Z?"
- OR Statements: "The Evolution of X", "Core Concepts of Y"

**Section Pattern:**
```markdown
## What is Infrastructure as Code?

[1-3 sentence definition/context introducing the concept]

[Main content with H3 subsections as needed]

### Subsection Name

[Content describing this specific aspect]

[More content, code blocks, examples]

---
```

**Key Points:**
- Each H2 typically begins with definition or context sentence
- Use H3 for related subtopics
- Separate each major H2 section with `---`
- Sections typically 2-8 pages of content

### 5. CODE BLOCKS

**Format with Language Identifier:**
````
```hcl
resource "aws_s3_bucket" "main" {
  bucket = "my-organisation-data-bucket"
}
```
````

**Supported Languages:**
- `hcl` (Terraform/HashiCorp)
- `yaml` (Kubernetes, CloudFormation)
- `typescript` (AWS CDK, JavaScript)
- `python` (Python scripts, ML code)
- `bash` (Shell commands)
- `json` (JSON configurations)
- `java`, `go`, `csharp` (as needed)

**Best Practices:**
- Include language identifier (syntax highlighting)
- Typically 10-40 lines per block
- Code is representative but may be excerpted
- Command output blocks use ` ``` ` without language identifier
- Code blocks should be readable and well-commented

### 6. IMAGES

**Format:**
```markdown
![Descriptive alt text describing what the image shows](/blog/[slug]/inline-1.png)

Image Caption In Title Case
```

**Critical Points:**
- Alt text must be comprehensive and descriptive
- Path format: `/blog/[slug]/inline-1.png`, `inline-2.png`, etc.
- Caption on next line, title case
- Use relative paths (no domain)
- Provides accessible context for all viewers
- Multiple images use incrementing numbers (inline-1, inline-2, etc.)

### 7. TERMINOLOGY/GLOSSARY SECTION

**Exact Format:**
```markdown
## Okay, what terminology do I need to understand?

### Term Name

[1-3 sentence practical definition with context]

### Another Term

[1-3 sentence practical definition]

### Third Term

[1-3 sentence practical definition]
```

**Key Points:**
- H2 heading: `## Okay, what terminology do I need to understand?` (EXACT)
- H3 for each term
- 1-3 sentences per definition
- Practical and context-aware (not dictionary-style)
- Typically 10-15 terms
- Appears BEFORE the closing section
- Covers terms from throughout the article

### 8. CLOSING SECTION (Exact Format Required)

```markdown
## Finally, we made it, did this help?

If you found this to be helpful, have any questions or want to provide feedback, please let me know.

Don't worry if all of this seems overwhelming.

*   **Like, comment and share this article**
*   **Follow this blog** to receive notifications of new postings
*   **View** [previous postings](https://robertleggett.com.au/)
```

**Critical Points:**
- H2 heading: `## Finally, we made it, did this help?` (EXACT)
- Opening line: "If you found this to be helpful..." (EXACT)
- Reassurance: "Don't worry if all of this seems overwhelming." (EXACT)
- Exactly 3 action items in bullet points
- Links use relative paths
- NO additional content after this section
- This is the final section of the article

---

## TONE & VOICE GUIDE

### What To Do ✓

- Professional but accessible language
- Warm, welcoming tone
- Confident, authoritative explanations
- Comprehensive but focused
- Specific, concrete examples and code
- Narrative flow: why → what → how
- Second-person inclusive ("we," "us," "let's")
- Mix of short and long sentences
- Emphasis on real-world context and "at scale"
- Use em dashes (—) for emphasis

### What NOT To Do ✗

- Marketing hype or buzzwords
- Condescending or overly simple explanations
- Uncertain or wishy-washy language
- Shallow OR overwhelming content
- Abstract theory without examples
- Impersonal academic tone
- Jargon without explanation

### Signature Phrases

- "Welcome to the deep dive series!"
- "we will immerse ourselves in..."
- "Let's dive in..."
- "demystify..."
- "at scale" (appears throughout for real-world context)
- "don't worry if X seems overwhelming"
- "Now, let's get started."

---

## COMPLETE ARTICLE STRUCTURE TEMPLATE

```
1. Frontmatter (YAML with all 5 sections: title, meta, og, twitter, tags)
2. Opening Welcome Paragraph (3-4 sentences, "Welcome to the deep dive series!")
3. Separator (---)
4. "Before you start" section (with 3 exact subsections)
5. Separator (---)
6. Main Topic Definition (first H2 section with H3s)
7. Separator (---)
8. [Multiple additional sections, each with ---]
9. ...
10. Terminology section ("Okay, what terminology...")
11. Separator (---)
12. Closing section ("Finally, we made it...")
```

**Metrics:**
- Reading Time: 10-20 minutes
- Line Count: 700-900+ lines
- H2 Sections: 15-20+
- H3 Subsections: 20-40+
- Code Examples: 5-15+
- Images: 3-8+

---

## PRE-PUBLICATION CHECKLIST

### Frontmatter
- ☐ Title formatted as "Deep Dive - [Topic]"
- ☐ slug is "deep-dive-[kebab-case]"
- ☐ status is "publish"
- ☐ feature_image path correct
- ☐ Tags include 9 items with "Robert Leggett" last
- ☐ meta.canonical URL correct
- ☐ meta.description is single sentence
- ☐ og and twitter sections complete

### Structure
- ☐ Opening paragraph starts with "Welcome to the deep dive series!"
- ☐ "Before you start" section with exact 3 subsections
- ☐ All major H2 sections separated by `---`
- ☐ Terminology section titled exactly as shown
- ☐ Closing section titled exactly as shown
- ☐ No content after closing section

### Content Quality
- ☐ Code blocks include language identifiers
- ☐ All images have alt text
- ☐ All images have captions
- ☐ Image paths use /blog/[slug]/inline-N.png
- ☐ H2 headers are questions or declarative statements
- ☐ Tone is warm, professional, comprehensive
- ☐ Specific examples and real-world context throughout
- ☐ No custom React components or MDX shortcodes
- ☐ Pure Markdown with embedded code

### Polish
- ☐ No typos or grammar errors
- ☐ Em dashes (—) used for emphasis, not hyphens
- ☐ Bullet points used for lists
- ☐ Links are relative paths where appropriate
- ☐ Consistent code formatting throughout
- ☐ Consistent capitalization and punctuation

---

## MDX & TECHNICAL NOTES

### What IS Used
- ✓ Standard Markdown
- ✓ Code blocks with language identifiers
- ✓ Markdown images with relative paths
- ✓ Bullet lists and numbered lists
- ✓ Horizontal rules (---)
- ✓ Bold (**text**) and italics (*text*)
- ✓ Headers (## and ### only for H2 and H3)
- ✓ Inline code (`code`)

### What Is NOT Used
- ✗ React JSX components
- ✗ Custom MDX shortcodes
- ✗ Frontmatter imports
- ✗ H1 headers (#)
- ✗ H4+ headers (#### and below)
- ✗ HTML tags
- ✗ Complicated nested structures

### Image Directory Structure
All images should follow this path pattern:
```
/blog/deep-dive-[slug]/
├── feature-image.png          (main article image)
├── inline-1.png               (first inline image)
├── inline-2.png               (second inline image)
└── inline-N.png               (additional images)
```

---

## COMMON PATTERNS ACROSS POSTS

### Pattern 1: Definition → Key Points → Context
Used for foundational concepts like "What is Infrastructure as Code?"
- Opens with definition
- Lists key aspects (often 2 main paradigms)
- Closes with real-world context

### Pattern 2: Opening Statement → Bullet List → Code Example
Used for technical features like "Terraform State Management"
- Explains the concept
- Lists benefits or characteristics
- Provides working code example

### Pattern 3: H2 Question → Multiple H3 Subsections → Comparison
Used for comparing tools or approaches
- Each H3 covers one tool/option
- Consistent structure across subsections
- Side-by-side code examples

### Pattern 4: Historical Context → Evolution → Modern Approach
Used for "How has IaC evolved?"
- Lists historical eras chronologically
- Explains what problem each solved
- Bridges to current best practices

### Pattern 5: Concept → Multiple Examples → Production Considerations
Used for complex technical topics like "Vector Similarity Metrics"
- Explains math/theory
- Provides multiple real examples
- Discusses when to use each approach

---

## RECENTLY PUBLISHED POSTS (For Reference)

1. **Deep Dive - Infrastructure as Code at Scale** (916 lines)
   - Topics: Terraform, CloudFormation, CDK, Pulumi, state management, scaling
   
2. **Deep Dive - Kubernetes Cost Optimisation** (748 lines)
   - Topics: Resource model, QoS classes, HPA/VPA/Karpenter, spot instances, FinOps
   
3. **Deep Dive - Vector Databases** (732 lines)
   - Topics: Embeddings, similarity metrics, indexing algorithms, RAG, chunking
   
4. Additional Posts:
   - Multi-Cloud Networking
   - Serverless at Scale
   - Zero Trust Architecture
   - Platform Engineering
   - DNS
   - AI Cloud Security
   - Data Mesh
   - MLOps

---

## WRITING TIPS

### Effective Opening Paragraphs
- Start with clear problem statement or topic introduction
- Address two different audience segments explicitly
- Emphasize value and learning outcomes
- End with inspiring action invitation
- Use inclusive language ("we," "together," "our journey")

### Effective H2 Sections
- Begin with context or definition sentence
- Use H3s to break up longer sections
- Keep each subsection focused on one idea
- End with transition to next section or horizontal rule

### Effective Code Examples
- Include complete, runnable examples when possible
- Add comments in code to explain key lines
- Include command output when relevant
- Provide context paragraph before/after code
- Use consistent indentation and formatting

### Effective Terminology Sections
- Cover key terms from the entire article
- Provide practical definitions, not dictionary entries
- Use context-aware language
- Keep definitions concise (1-3 sentences)
- Order by appearance or logical grouping

### Effective Transitions
- Use horizontal rules (---) to separate major thoughts
- Start new sections with topic sentences
- Reference previous concepts in new sections
- Build from foundational to advanced topics

---

## FINAL NOTES

- **Consistency is key**: These posts follow a rigid structure that readers expect
- **Tone matters**: Warm, inclusive tone sets these posts apart from typical technical writing
- **Specificity wins**: Real examples, actual commands, concrete numbers build credibility
- **Audience-first**: Always remember you're writing for intermediate to advanced practitioners
- **Length is okay**: 10-20 minutes is appropriate for comprehensive, detailed coverage
- **Structure enables learning**: The consistent format helps readers navigate complex topics

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-15  
**Based on Analysis of:** 3 full deep-dive posts + 11 total posts in series  
**Total Posts Analyzed:** 916 + 748 + 732 lines = 2,396 lines of reference material
