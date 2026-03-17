# Content Guide

This document describes the content system, blog post categories, and all 63 published posts.

---

## Content System Overview

All blog content lives in `content/publish/` as MDX or Markdown files. Each file is processed at build time through:

1. **gray-matter** — Extracts YAML frontmatter metadata
2. **MDXRemote** — Renders MDX/Markdown to React components
3. **remark-gfm** — GitHub Flavoured Markdown (tables, strikethrough)
4. **rehype-slug** — Auto-generates heading IDs
5. **rehype-autolink-headings** — Adds anchor links to headings
6. **rehype-highlight** — Syntax highlighting for code blocks

---

## Post Categories

### Deep Dive Series (22 posts)

Comprehensive technical articles with diagrams, code snippets, and detailed explanations. These follow a strict format documented in `docs/DEEP-DIVE-MASTER-GUIDE.md`.

#### Cloud & Infrastructure

| Post | Slug | Topics |
|------|------|--------|
| Deep Dive - DNS | `deep-dive-dns` | DNS resolution, record types, Route 53 |
| Deep Dive - Infrastructure as Code at Scale | `deep-dive-infrastructure-as-code-at-scale` | Terraform, CDK, multi-account IaC |
| Deep Dive - Kubernetes Cost Optimisation | `deep-dive-kubernetes-cost-optimisation` | Right-sizing, spot instances, autoscaling |
| Deep Dive - Multi-Cloud Networking | `deep-dive-multi-cloud-networking` | VPC peering, transit gateway, interconnects |
| Deep Dive - Platform Engineering | `deep-dive-platform-engineering` | IDP, golden paths, self-service |
| Deep Dive - Serverless at Scale | `deep-dive-serverless-at-scale` | Lambda, event-driven patterns, cold starts |
| Deep Dive - Data Mesh | `deep-dive-data-mesh` | Domain ownership, data products, federated governance |

#### Security & Identity

| Post | Slug | Topics |
|------|------|--------|
| Deep Dive - Zero Trust Architecture | `deep-dive-zero-trust-architecture` | Never trust, always verify, micro-segmentation |
| Deep Dive - AI-Powered Cloud Security | `deep-dive-ai-cloud-security` | ML threat detection, CSPM, SIEM |
| Deep Dive - OAuth 2.0 and OpenID Connect | `deep-dive-oauth2-and-openid-connect` | Auth code flow, PKCE, scopes, ID tokens |
| Deep Dive - SAML and Enterprise Federation | `deep-dive-saml-and-enterprise-federation` | SP/IdP SSO, assertions, bindings |
| Deep Dive - JSON Web Tokens | `deep-dive-json-web-tokens` | JWT structure, signing, JWKS, refresh tokens |
| Deep Dive - Multi-Factor Authentication | `deep-dive-multi-factor-authentication` | TOTP, WebAuthn, push, step-up auth |
| Deep Dive - Zero Trust Identity | `deep-dive-zero-trust-identity` | Continuous auth, device trust, risk-based |
| Deep Dive - Identity Governance | `deep-dive-identity-governance` | IGA, access reviews, lifecycle, SoD |
| Deep Dive - Passwordless Authentication | `deep-dive-passwordless-authentication` | Passkeys, FIDO2, WebAuthn, magic links |
| Deep Dive - API Authentication | `deep-dive-api-authentication` | API keys, OAuth, mTLS, HMAC, gateway auth |
| Deep Dive - Identity in Microservices | `deep-dive-identity-in-microservices` | Token propagation, SPIFFE, service mesh, OPA |
| Deep Dive - Cloud IAM at Scale | `deep-dive-cloud-iam-at-scale` | AWS IAM, Azure RBAC, GCP IAM, CIEM |

#### AI & ML

| Post | Slug | Topics |
|------|------|--------|
| Deep Dive - MLOps | `deep-dive-mlops` | ML pipelines, model registry, monitoring |
| Deep Dive - Vector Databases and Embeddings | `deep-dive-vector-databases` | Vector search, HNSW, embeddings, RAG |
| Deep Dive - Real-Time Computer Vision | `deep-dive-real-time-computer-vision` | DeepStream, Triton, on-premise + cloud |

---

### AI & Machine Learning (10 posts)

| Post | Slug |
|------|------|
| AI at the Edge: Bringing Intelligence Closer | `ai-at-the-edge-bringing-intelligence-closer` |
| AI-Powered Developer Tools | `ai-powered-developer-tools-transforming-software-development` |
| Building AI-Powered Applications in the Cloud | `building-ai-powered-applications-in-the-cloud` |
| Building a Local AI Playground | `building-a-local-ai-playground-classical-ml-meets-modern-llms` |
| Demystifying Large Language Models | `demystifying-large-language-models` |
| Fine-Tuning vs Foundation Models | `fine-tuning-vs-foundation-models-choosing-right-approach` |
| Prompt Engineering | `prompt-engineering-art-and-science-of-communicating-with-ai` |
| RAG: Grounding AI in Enterprise Data | `retrieval-augmented-generation-rag-grounding-ai-in-enterprise-data` |
| Responsible AI | `responsible-ai-building-trust-through-ethical-systems` |
| The Rise of AI Agents | `the-rise-of-ai-agents` |

---

### Cloud Architecture (8 posts)

| Post | Slug |
|------|------|
| AWS Multi-Account Architecture | `aws-multi-account-architecture-scaling-with-isolation` |
| GCP Multi-Project Architecture | `gcp-multi-project-architecture-organising-cloud-at-scale` |
| Azure Multi-Subscription Architecture | `azure-multi-subscription-architecture-enterprise-landing-zones` |
| AWS DNS and Certificate Management | `aws-dns-and-certificate-management` |
| AWS to GCP to Azure Services Mapping | `aws-to-gcp-to-azure-services-mapping` |
| Infrastructure as Code with AWS CDK | `infrastructure-as-code-with-aws-cdk-reusable-constructs` |
| Why All Cloud Providers Need a CDK | `why-i-dont-think-googles-data-loss-prevention-api-is-ready-for-use` |
| Introduction to the Cloud | `introduction-to-the-cloud` |

---

### Certifications & Career (8 posts)

| Post | Slug |
|------|------|
| AWS Certified Security Speciality | `how-i-passed-my-aws-certified-security-speciality-exam` |
| AWS Solution Architect Associate | `how-i-passed-the-aws-certified-solution-architect-associate-exam` |
| GCP Professional Cloud Architect | `how-i-passed-the-gcp-professional-cloud-architect-exam` |
| Azure Fundamentals AZ-900 | `how-i-passed-my-azure-fundamentals-az-900-exam` |
| TOGAF 9.2 | `how-i-passed-my-togaf-9-2-exam` |
| Cloud Certification Journey | `cloud-certification-journey` |
| AWS/GCP/Azure Certification Study Material | `aws-gcp-azure-certification-study-material` |
| Proven Ways to Reduce Cloud Costs | `proven-ways-to-reduce-your-cloud-costs` |

---

### Architecture & Engineering (7 posts)

| Post | Slug |
|------|------|
| Choreography vs Orchestration | `when-should-you-choose-choreography-vs-orchestration-for-your-microservices-architecture` |
| Event Streaming or Messaging | `choosing-event-streaming-or-messaging-for-your-architecture` |
| Digital Identity Migration | `seizing-the-future-an-eager-approach-to-digital-identity-migration-strategies` |
| The AI-Ready Organisation | `the-ai-ready-organisation-preparing-teams-for-ai` |
| Agile High-Performing Team | `agile-high-performing-team` |
| Agile in the Industry | `agile-in-the-industry` |
| Great People Grow with Good Leadership | `great-people-grow-with-good-leadership` |

---

### Cloud Training (2 posts)

| Post | Slug |
|------|------|
| Top 5 Cloud Training Providers 2019 | `top-5-cloud-training-providers-for-2019` |
| Best Cloud Training Providers 2020 | `best-cloud-training-providers-for-2020` |

---

### Technical Tutorials (6 posts)

| Post | Slug |
|------|------|
| Angular + Bootstrap + Spring Boot Security | `angular-bootstrap-spring-boot-security` |
| Jersey RESTful WebService + JPA + Derby | `jersey-restful-webservice-jakarta-ee-jpa-derby` |
| Node.js with GitHub Pages + Travis CI | `nodejs-with-github-pages-and-travis-ci` |
| React Component Library | `react-component-library` |
| Secure WebSockets + Spring Boot | `secure-websockets-spring-boot-spring-security` |
| Google DLP API Review | `why-i-dont-think-googles-data-loss-prevention-api-is-ready-for-use` |

---

## Frontmatter Reference

See `docs/CONTRIBUTING.md` for the full frontmatter template. Key fields:

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title |
| `date` | Yes | ISO 8601 date (YYYY-MM-DD) |
| `slug` | Yes | URL slug (must match filename) |
| `status` | Yes | `"publish"` for live posts |
| `feature_image` | Yes | Path to hero image |
| `tags` | Yes | Array of tags (last: "Robert Leggett") |
| `meta` | Yes | SEO metadata (title, description, keywords, canonical) |
| `og` | Yes | Open Graph tags for social sharing |
| `twitter` | Yes | Twitter Card tags |

---

## Image Conventions

| Type | Path | Dimensions | Format |
|------|------|-----------|--------|
| Feature image | `/blog/[slug]/feature-image.png` | 1024×768 | PNG |
| Inline diagrams | `/blog/[slug]/inline-N.png` | 1024×400–600 | PNG |
| OG fallback | `/og-image.png` | 1200×630 | PNG |
| Avatar | `/avatar/headshot.jpg` | Square | JPEG |

Inline images are referenced in MDX as:

```markdown
![Alt text description](/blog/my-post-slug/inline-1.png)
```
