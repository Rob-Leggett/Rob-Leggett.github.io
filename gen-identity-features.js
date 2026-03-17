const sharp = require('sharp');
const path = require('path');

const blogs = [
  { slug: 'deep-dive-oauth2-and-openid-connect', title: 'OAuth 2.0 &\nOpenID Connect', subtitle: 'Authorisation Flows, Tokens & PKCE', accent: '#f59e0b' },
  { slug: 'deep-dive-saml-and-enterprise-federation', title: 'SAML & Enterprise\nFederation', subtitle: 'SSO, Assertions & Identity Providers', accent: '#ef4444' },
  { slug: 'deep-dive-json-web-tokens', title: 'JSON Web\nTokens (JWT)', subtitle: 'Structure, Signing & Validation', accent: '#8b5cf6' },
  { slug: 'deep-dive-multi-factor-authentication', title: 'Multi-Factor\nAuthentication', subtitle: 'TOTP, WebAuthn, FIDO2 & Passkeys', accent: '#10b981' },
  { slug: 'deep-dive-zero-trust-identity', title: 'Zero Trust\nIdentity', subtitle: 'Continuous Auth & Context-Aware Access', accent: '#06b6d4' },
  { slug: 'deep-dive-identity-governance', title: 'Identity Governance\n& Administration', subtitle: 'RBAC, ABAC, Lifecycle & Compliance', accent: '#ec4899' },
  { slug: 'deep-dive-passwordless-authentication', title: 'Passwordless\nAuthentication', subtitle: 'Passkeys, WebAuthn & Magic Links', accent: '#14b8a6' },
  { slug: 'deep-dive-api-authentication', title: 'API Authentication\n& Authorisation', subtitle: 'OAuth, mTLS, HMAC & API Keys', accent: '#f97316' },
  { slug: 'deep-dive-identity-in-microservices', title: 'Identity in\nMicroservices', subtitle: 'SPIFFE, Service Mesh & Token Propagation', accent: '#6366f1' },
  { slug: 'deep-dive-cloud-iam-at-scale', title: 'Cloud IAM\nat Scale', subtitle: 'AWS, GCP & Azure Identity Management', accent: '#3b82f6' },
];

async function generate(blog) {
  const { slug, title, subtitle, accent } = blog;
  const lines = title.split('\n');
  const titleY1 = lines.length === 2 ? 340 : 370;
  const titleY2 = titleY1 + 60;

  // Generate circles
  let circles = '';
  const rng = (s) => { let h = 0; for(let i=0;i<s.length;i++) h = ((h<<5)-h)+s.charCodeAt(i); return Math.abs(h); };
  const seed = rng(slug);
  for (let i = 0; i < 12; i++) {
    const cx = (seed * (i+1) * 73) % 1024;
    const cy = (seed * (i+1) * 47) % 768;
    const r = 20 + ((seed * (i+1) * 31) % 80);
    const op = 0.03 + ((seed * (i+1) * 13) % 5) / 100;
    circles += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${accent}" opacity="${op}"/>`;
  }

  const svg = `<svg width="1024" height="768" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0f172a"/>
        <stop offset="100%" style="stop-color:#1e293b"/>
      </linearGradient>
    </defs>
    <rect width="1024" height="768" fill="url(#bg)"/>
    <g opacity="0.06">
      ${Array.from({length:17}, (_,i) => `<line x1="${i*64}" y1="0" x2="${i*64}" y2="768" stroke="white" stroke-width="0.5"/>`).join('')}
      ${Array.from({length:13}, (_,i) => `<line x1="0" y1="${i*64}" x2="1024" y2="${i*64}" stroke="white" stroke-width="0.5"/>`).join('')}
    </g>
    ${circles}
    <rect x="412" y="240" width="200" height="36" rx="18" fill="${accent}" opacity="0.15"/>
    <text x="512" y="264" fill="${accent}" font-family="Arial,Helvetica,sans-serif" font-size="15" text-anchor="middle" font-weight="bold" letter-spacing="3">DEEP DIVE</text>
    <text x="512" y="${titleY1}" fill="white" font-family="Arial,Helvetica,sans-serif" font-size="52" text-anchor="middle" font-weight="bold">${lines[0]}</text>
    ${lines.length === 2 ? `<text x="512" y="${titleY2}" fill="white" font-family="Arial,Helvetica,sans-serif" font-size="52" text-anchor="middle" font-weight="bold">${lines[1]}</text>` : ''}
    <text x="512" y="${lines.length === 2 ? titleY2 + 45 : titleY1 + 45}" fill="${accent}" font-family="Arial,Helvetica,sans-serif" font-size="18" text-anchor="middle">${subtitle}</text>
    <text x="512" y="580" fill="#94a3b8" font-family="Arial,Helvetica,sans-serif" font-size="14" text-anchor="middle" letter-spacing="4" font-weight="bold">ROBERT LEGGETT</text>
    <rect x="462" y="595" width="100" height="3" rx="1.5" fill="${accent}" opacity="0.6"/>
  </svg>`;

  const outPath = path.join('public/blog', slug, 'feature-image.png');
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  console.log(`✓ ${slug}`);
}

(async () => {
  for (const b of blogs) await generate(b);
  console.log('All 10 feature images generated');
})();
