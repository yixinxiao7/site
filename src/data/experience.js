export const experiences = [
  {
    company: "Capital One",
    title: "Senior Software Engineer",
    location: "New York, NY",
    period: "Jan 2024 — Present",
    description: [
      "Architected Terraform-based CI/CD pipelines to provision Databricks infrastructure and AWS resources for a platform serving 10,000+ users, reducing annual incident rates by 60%",
      "Designed and launched a Governance SDK adopted by 5 cross-functional teams within 2 months, standardizing Databricks platform integrations and reducing duplicate implementation effort",
      "Built an event-driven microservices system on AWS Lambda and EventBridge with automated health checks, reducing platform RTO from 10 hours to 15 minutes and cutting weekly operational support time by 93%",
      "Automated code auditing and sanitization workflows across the governance layer, eliminating 80+ hours of manual security remediation work per quarter",
      "Built an AI-assisted operational support agent and CLI workflow that tripled biweekly ticket throughput and cut new Lambda service setup from 1–2 hours to under 5 minutes",
    ],
  },
  {
    company: "Capital One",
    title: "Software Engineer",
    location: "New York, NY",
    period: "Aug 2022 — Jan 2024",
    description: [
      "Optimized Databricks compute policies and workload guardrails, reducing platform spend by $100K per month ($1.2M annualized)",
      "Built a medallion architecture pipeline for Databricks chargeback reporting, enabling self-service analytics across 3 enterprise business verticals",
      "Led migration of 7,000+ users from legacy Private Cloud Databricks to SaaS Databricks, improving governance through centralized account management and stronger identity controls",
    ],
  },
  {
    company: "Capital One",
    title: "Associate Software Engineer",
    location: "New York, NY",
    period: "Aug 2021 — Aug 2022",
    description: [
      "Built a centralized search portal for cybersecurity products and resources, consolidating 100+ entities used by 20+ internal teams",
      "Improved search relevance and query performance by up to 35% through TF-IDF wrapper optimization and AWS RDS schema improvements",
    ],
  },
  {
    company: "University of Michigan, Palfey Lab",
    title: "Undergraduate Research Assistant",
    location: "Ann Arbor, MI",
    period: "Oct 2020 — Aug 2021",
    description: [
      "Built and deployed a full-stack search engine on Docker and OpenShift, integrating a Neo4j graph database with custom search algorithms to support partial and fuzzy matching of chemical compound structures",
      "Simulated chemical compound structures with Vis.js leading to interactive graph search methods, adding another search dimension",
    ],
  },
];

export const education = {
  school: "University of Michigan — Ann Arbor",
  degree: "BSE in Computer Science",
  minor: "Minor in Business Administration",
  extras: "GPA: 3.80 · Summa Cum Laude",
  period: "2017 — 2021",
};

export const projects = [
  {
    name: "Triplanner",
    subtitle: "Full-Stack Travel Planning App",
    description:
      "Containerized travel planning app with React 18, Express, JWT authentication, Docker, and Nginx with TLS. Automated development workflows using LLM-powered multi-agent orchestration with integrated code review and QA testing.",
    link: "https://github.com/yixinxiao7/triplanner",
    webapp: "https://triplanner.yixinx.com/",
  },
  {
    name: "Diet Tracker",
    subtitle: "Serverless Nutrition Tracking App",
    description:
      "Serverless nutrition tracker on AWS (Lambda, API Gateway, RDS PostgreSQL, Cognito) with OAuth 2.0 PKCE authentication. End-to-end CI/CD with GitHub Actions and automated Playwright testing.",
    link: "https://github.com/yixinxiao7/diet-tracker",
    webapp: "https://diet-tracker.yixinx.com/",
  },
  {
    name: "I Wish Spotify Could",
    subtitle: "Spotify Playlist Organization Tool",
    description:
      "Web app for categorizing uncategorized liked songs into playlists with in-app playback and bulk assignment. Built with Next.js 15, React 19, TypeScript, Tailwind CSS, FastAPI, and Spotify OAuth 2.0.",
    link: "https://github.com/yixinxiao7/i-wish-spotify-could",
    webapp: "https://i-wish-spotify-could.yixinx.com/",
  },
];

export const skills = {
  languages: "Python, Java, TypeScript, JavaScript, SQL, C++",
  frameworks: "Spring Boot, Node.js, Express, FastAPI, React, Next.js",
  cloud:
    "AWS (Lambda, API Gateway, EventBridge, SQS, S3, CloudFront, RDS, Cognito, CloudWatch), Terraform, Docker, Jenkins, OpenShift, GitHub Actions, CI/CD",
  data: "Databricks, Apache Spark, PySpark, PostgreSQL, Neo4j, Cypher",
  tools: "Git, Linux",
};

export const contact = {
  email: "yixinxiao7@gmail.com",
  linkedin: "https://www.linkedin.com/in/yixin-xiao",
  github: "https://github.com/yixinxiao7",
  resume: "/resume_2026.pdf",
};
