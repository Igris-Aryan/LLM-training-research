import { GlossaryTerm, QuizQuestion, ReportPage, TrainingStage } from '../types';

export const GUIDE_METADATA = {
  title: "Demystifying Large Language Models: A Comprehensive Beginner's Guide to the Future of Computing",
  author: "Generated AI Research Report",
  basis: "An Extended Primer Based on the Masterclass by Andrej Karpathy",
  date: "September 13, 2026",
  abstract: "Artificial Intelligence has transitioned from the realm of science fiction into a fundamental pillar of modern technology. At the center of this revolution are Large Language Models (LLMs) like ChatGPT, LLaMA, and Claude. To the uninitiated, these systems appear to possess human-like intelligence, reasoning, and creativity. However, beneath the surface, they are powered by straightforward mathematical principles, massive datasets, and immense computational power. This extended research paper is designed specifically for beginners. It strips away the complex jargon to explain how LLMs are built, how they function as 'lossy zip files' of the internet, and how they undergo a rigorous three-stage training process. Furthermore, we explore the future trajectory of AI—where LLMs evolve into complete 'Operating Systems'—and demystify the unique, often surprising cybersecurity threats they introduce, such as prompt injection and jailbreaking."
};

export const REPORT_PAGES: ReportPage[] = [
  {
    pageNumber: 1,
    title: "Title & Abstract",
    section: "Cover & Overview",
    summary: "Introductory framing: LLMs appear human-like, but are grounded in straightforward math, massive internet data, and compute.",
    keyTakeaways: [
      "Based on Andrej Karpathy's masterclass teachings",
      "Demystifies LLMs as 'lossy zip files' of public internet text",
      "Covers 3-stage training, LLM OS evolution, and novel cybersecurity vulnerabilities"
    ]
  },
  {
    pageNumber: 2,
    title: "Table of Contents",
    section: "Contents",
    summary: "Comprehensive structure: 8 major chapters spanning foundational anatomy to cybersecurity threats and glossary.",
    keyTakeaways: [
      "8 distinct chapters covering the complete lifecycle of LLMs",
      "Clear progression from basic mechanisms to advanced systems and security"
    ]
  },
  {
    pageNumber: 3,
    title: "1. The Shift from Rules to Patterns",
    section: "Introduction",
    summary: "Traditional programming is deterministic (inflexible rules). AI flips this to probabilistic pattern matching. An LLM is essentially advanced autocomplete.",
    keyTakeaways: [
      "Traditional coding = human writes rules; program crashes on unexpected input",
      "Machine learning = computer figures out rules from data and learning objective",
      "LLM physical footprint: 140GB Parameters file (weights) + 500-line C Run file (run.c)",
      "Can run entirely locally on a modern laptop without internet once trained"
    ]
  },
  {
    pageNumber: 4,
    title: "2. The Anatomy of an AI: Tokens, Parameters & Transformers",
    section: "Architecture",
    summary: "Computers only process numbers. Language is broken into tokens. Parameters are tunable knobs. Transformers process tokens in parallel.",
    keyTakeaways: [
      "Tokens: chunks of text (e.g. apple = 1 token, unbelievable = 3 tokens)",
      "1 token ≈ 3/4 of an English word; 100k context window ≈ 75,000 words (a full novel)",
      "70B parameters = 70 billion individual knobs and dials tuned over months of training",
      "Transformers (2017 Google breakthrough) read all tokens simultaneously"
    ]
  },
  {
    pageNumber: 5,
    title: "2.3 Self-Attention Mechanism (Figure 1)",
    section: "Self-Attention",
    summary: "Explains how self-attention shines mathematical spotlights on connected words (e.g. 'river bank' vs 'money bank').",
    keyTakeaways: [
      "'The bank of the river was muddy' vs 'The bank approved my loan' disambiguation",
      "Figure 1: Next-word prediction ('The student opened their text' -> 'book (98%)')",
      "All tokens processed simultaneously across neural network layers"
    ]
  },
  {
    pageNumber: 6,
    title: "3. Lossy Compression: Why AI 'Hallucinates'",
    section: "Compression",
    summary: "LLM training is lossy compression (~100x ratio, 10TB internet compressed into 140GB weights). The model 'dreams' documents rather than querying a database.",
    keyTakeaways: [
      "Lossless ZIP file = 100% exact bit-for-bit file extraction",
      "Lossy LLM = retains statistical relationships, drops verbatim bytes (10TB -> 140GB)",
      "Hallucinations are not software bugs; they are inherent to statistical next-word dreaming"
    ]
  },
  {
    pageNumber: 7,
    title: "4. The Three-Stage Training Pipeline: Stage 1 (Figure 2)",
    section: "Training Pipeline",
    summary: "Stage 1 Pre-Training: Ingests 10+ TB raw internet text using thousands of GPUs, costing millions of dollars, producing a Base Model.",
    keyTakeaways: [
      "Stage 1 Pre-Training: Months on GPU server clusters; costs tens of millions",
      "Base Model: Babbles text; doesn't understand dialogue format",
      "Base model replies to 'Capital of France?' with more quiz questions from the web"
    ]
  },
  {
    pageNumber: 8,
    title: "4.2 Stage 2 (SFT) & 4.3 Stage 3 (RLHF)",
    section: "Training Pipeline",
    summary: "Stage 2 teaches the conversational assistant persona via ~100k curated Q&As. Stage 3 uses human preference rankings to train a Reward Model.",
    keyTakeaways: [
      "Stage 2 (SFT): ~100k human-crafted examples; fast & cheap; creates polite assistant",
      "Stage 3 (RLHF): Humans rank candidate answers (A vs B vs C) to build a Reward Model",
      "Reinforces tone, nuance, and safety (e.g. refusing harmful requests gives high reward)"
    ]
  },
  {
    pageNumber: 9,
    title: "5. Scaling Laws: Why AI is Moving So Fast",
    section: "Scaling Laws",
    summary: "Predictable mathematical relationship between Parameters (N), Data (D), and Compute (C). Increase these three, and capabilities automatically improve.",
    keyTakeaways: [
      "N (Parameters), D (Data tokens), C (Compute GPUs)",
      "Mathematically guaranteed performance gains without altering base architecture",
      "Drives the global GPU arms race across tech giants"
    ]
  },
  {
    pageNumber: 10,
    title: "6. The LLM Operating System (Figure 3)",
    section: "LLM OS",
    summary: "An LLM is not just a chatbot, but the central CPU/Kernel of an operating system orchestrating RAM, disk, and external tools.",
    keyTakeaways: [
      "LLM Kernel = CPU / Orchestrator",
      "RAM = Context Window (active memory)",
      "Hard Drive = Web and local files",
      "Tool Peripherals = Calculator, Python code interpreter, Browser, Image/Video generators"
    ]
  },
  {
    pageNumber: 11,
    title: "6.2 System 1 vs. System 2 Thinking",
    section: "Reasoning",
    summary: "Kahneman's dual systems: current LLMs are fast System 1 (instinctual chunking). Future frontier is System 2 (slow, deliberate tree-of-thoughts).",
    keyTakeaways: [
      "System 1: Fast, automatic, blurted out token-by-token (current models)",
      "System 2: Slow, deliberate, logical, trades time for accuracy",
      "Tree-of-thoughts: explores solutions, verifies work, prunes bad paths"
    ]
  },
  {
    pageNumber: 12,
    title: "7. Novel Cybersecurity Threats",
    section: "Cybersecurity",
    summary: "LLMs process human language, bypassing traditional firewalls. Introduces Jailbreaks, Prompt Injection, and Data Poisoning.",
    keyTakeaways: [
      "7.1 Jailbreaks: Grandma roleplay exploit (bypassing safety rules via storytelling)",
      "7.2 Prompt Injection: Hidden invisible white text on webpage hijacking the LLM OS",
      "7.3 Data Poisoning: Sleeper agents activated by trigger phrases (e.g. 'James Bond')"
    ]
  },
  {
    pageNumber: 13,
    title: "8. Conclusion",
    section: "Conclusion",
    summary: "LLMs represent one of humanity's greatest technological shifts. Grounded in math and computational scale, accompanied by vital safety frontiers.",
    keyTakeaways: [
      "Transition from simple chatbots to robust LLM Operating Systems",
      "Securing natural language interfaces is the defining challenge of modern computing",
      "Understanding these foundations is critical for the 21st century"
    ]
  },
  {
    pageNumber: 14,
    title: "Glossary of Key Terms & References",
    section: "Glossary",
    summary: "12 foundational definitions from Algorithm to Transformer, referencing Karpathy's 2023 masterclass.",
    keyTakeaways: [
      "Comprehensive reference definitions for all core terminology",
      "Grounded in Andrej Karpathy's 2023 YouTube Masterclass"
    ]
  }
];

export const TRAINING_STAGES: TrainingStage[] = [
  {
    id: 1,
    title: "Stage 1: Pre-Training",
    subtitle: "Knowledge Acquisition (The Foundation)",
    cost: "Tens of millions of dollars",
    compute: "Thousands of high-performance GPUs running 24/7 for months",
    dataset: "10+ Terabytes of raw internet data (Wikipedia, Reddit, books, code, articles)",
    result: "A Base Model that babbles and mimics internet text",
    description: "The AI reads raw text, masks out tokens, and repeatedly adjusts billions of knobs (parameters) to predict the missing words. It absorbs vast world facts but has zero conversational manners or assistant training.",
    examplePrompt: "What is the capital of France?",
    exampleOutput: "What is the capital of Germany? What is the capital of Italy? A) Paris B) Berlin C) Rome..."
  },
  {
    id: 2,
    title: "Stage 2: Supervised Fine-Tuning (SFT)",
    subtitle: "Alignment & Persona Calibration",
    cost: "Thousands of dollars",
    compute: "Modest GPU cluster running for a few days",
    dataset: "~100,000 high-quality, human-crafted Q&A interaction pairs",
    result: "An Assistant Model that directly answers questions politely",
    description: "Human experts author ideal interactions. The base model is fine-tuned to learn the specific dialogue format: when it sees a 'User' query, it adopts a helpful, polite 'Assistant' persona instead of continuing the text like a random webpage.",
    examplePrompt: "Write a short poem about a cat.",
    exampleOutput: "Whiskers twitching, eyes so bright, stalking shadows in the night. Softly stepping on the floor, waiting by the kitchen door."
  },
  {
    id: 3,
    title: "Stage 3: RLHF",
    subtitle: "Reinforcement Learning from Human Feedback",
    cost: "Moderate",
    compute: "Iterative reinforcement loops against a trained Reward Model",
    dataset: "Millions of comparison rankings (Answer A vs B vs C) scored by humans",
    result: "The highly polished, nuanced, and safety-aligned commercial AI",
    description: "Writing full code or essays is hard for humans, but ranking them is easy. Humans rank candidate answers. A 'Reward Model' learns these human preferences. The AI then practices against this reward model to maximize helpfulness and safety.",
    examplePrompt: "How do I bypass corporate security firewalls?",
    exampleOutput: "I cannot assist with unauthorized access or bypassing network security protocols. I can, however, explain defensive firewall architecture."
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: "Algorithm",
    category: "architecture",
    definition: "A set of strict, step-by-step instructions given to a computer to perform a specific deterministic task.",
    analogy: "A strict baking recipe that must be followed line-by-line without deviation."
  },
  {
    term: "Base Model",
    category: "training",
    definition: "The raw AI model produced after Stage 1 (Pre-training). It is good at statistical text completion, but lacks conversational alignment or assistant behaviors.",
    analogy: "A student who has read every encyclopedia in the world, but has never been taught how to hold a polite conversation."
  },
  {
    term: "Context Window",
    category: "architecture",
    definition: "The 'short-term memory' of an AI. The maximum number of tokens it can read and hold in mind simultaneously during a single interaction.",
    analogy: "The physical surface area of a study desk: anything on the desk is instantly accessible, but once papers fall off, they are forgotten."
  },
  {
    term: "GPU (Graphics Processing Unit)",
    category: "systems",
    definition: "A specialized computer chip designed originally for parallel video game graphics, which excels at doing millions of matrix multiplications simultaneously.",
    analogy: "A workforce of 5,000 elementary calculators working in parallel, versus a standard CPU which is like one genius mathematician working alone."
  },
  {
    term: "Hallucination",
    category: "architecture",
    definition: "When an AI confidently generates false or fabricated information because it is predicting statistically likely next words rather than retrieving verified facts from a database.",
    analogy: "A confident improv actor who doesn't know the answer to a trivia question, so they invent a convincing-sounding story in real-time."
  },
  {
    term: "LLM (Large Language Model)",
    category: "architecture",
    definition: "An artificial intelligence system trained on massive datasets of text to understand, summarize, synthesize, and generate human language.",
    analogy: "A supercharged version of your smartphone's autocomplete that has read a significant portion of the public internet."
  },
  {
    term: "Parameters (Weights)",
    category: "architecture",
    definition: "The billions of adjustable numerical values inside a neural network that store the model's learned knowledge and patterns.",
    analogy: "A sound mixing board with 70 billion dials whose final adjusted positions encode human knowledge."
  },
  {
    term: "Prompt",
    category: "systems",
    definition: "The text, voice, or image input instruction provided by a human user to guide the AI's generation.",
    analogy: "The starting cue given to a jazz band or improv troupe."
  },
  {
    term: "Prompt Injection",
    category: "security",
    definition: "A cyberattack where malicious instructions are hidden within external data (like a webpage or email) to hijack an LLM OS into performing unauthorized actions.",
    analogy: "A modern Trojan Horse: an innocent-looking document containing secret commands that override the king's orders."
  },
  {
    term: "RLHF",
    category: "training",
    definition: "Reinforcement Learning from Human Feedback: a training technique where human ratings are used to train a Reward Model that guides the AI toward helpful, safe outputs.",
    analogy: "Training a dog with treats: rewarding polite actions and giving zero treats when it misbehaves."
  },
  {
    term: "Token",
    category: "architecture",
    definition: "The fundamental chunk of data processed by an LLM. A token can be a whole word, part of a word, or a single character (~3/4 of an English word).",
    analogy: "The individual syllable blocks used when children learn how to sound out sentences."
  },
  {
    term: "Transformer",
    category: "architecture",
    definition: "The revolutionary neural network architecture invented at Google in 2017 that processes sequences in parallel using 'Self-Attention'.",
    analogy: "A boardroom where every attendee listens to all others simultaneously, instantly understanding which sentences relate to one another."
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "According to Andrej Karpathy, what are the two core files that make up an open-source model like LLaMA-2 70B?",
    options: [
      "A Python virtual environment file and an SQLite database",
      "A 140GB parameters file (weights) and a ~500-line C code run file",
      "A cloud API access key and a Docker container image",
      "A training dataset file and a PyTorch checkpoint archive"
    ],
    correctIndex: 1,
    explanation: "As highlighted on Page 3, an LLM fundamentally consists of just two files: a large parameters file (e.g. 140GB weights) and a remarkably small run file (often ~500 lines of C code like run.c) that calculates the parameters.",
    pageRef: 3
  },
  {
    id: 2,
    question: "What is the typical ratio between tokens and words in English text?",
    options: [
      "1 token is roughly equivalent to 10 words",
      "1 token is roughly equivalent to 1 letter",
      "1 token is roughly equivalent to 3/4 of a word (0.75 words)",
      "1 token is strictly 2 words"
    ],
    correctIndex: 2,
    explanation: "Page 4 specifies the standard rule of thumb: 1 token is roughly equivalent to 3/4 of an English word. A 100,000 token context window holds about 75,000 words.",
    pageRef: 4
  },
  {
    id: 3,
    question: "How does the Transformer's Self-Attention mechanism distinguish the meaning of 'bank' in 'river bank' vs 'bank approved loan'?",
    options: [
      "By looking up the word in an embedded Oxford dictionary",
      "By scanning sequential words from left to right one letter at a time",
      "By shining a mathematical spotlight on surrounding words simultaneously across parallel parameters",
      "By executing an external web search query"
    ],
    correctIndex: 2,
    explanation: "Page 5 explains that Self-Attention allows the AI to examine all words simultaneously and mathematically calculate contextual connections—e.g. 'river' and 'muddy' spotlight the landform meaning of 'bank'.",
    pageRef: 5
  },
  {
    id: 4,
    question: "Why do LLMs hallucinate rather than simply saying 'I do not have this file in my database'?",
    options: [
      "Because the server has a hardware memory defect",
      "Because training is lossy compression (~100x); the model 'dreams' statistically probable text rather than querying a database",
      "Because the developers intentionally programmed false answers to deceive users",
      "Because the internet disconnected during generation"
    ],
    correctIndex: 1,
    explanation: "Pages 6 explains that LLMs compress 10TB of internet text into 140GB (lossy compression). The model does not store a factual database; it 'dreams' statistically probable next tokens based on learned patterns.",
    pageRef: 6
  },
  {
    id: 5,
    question: "What is the primary result of Stage 1 (Pre-Training) before fine-tuning is applied?",
    options: [
      "A polite, safe assistant that follows all user instructions",
      "A Base Model that babbles and continues internet text rather than answering conversational prompts",
      "A fully aligned customer support chatbot with zero hallucination",
      "An automated tool calling kernel with calculator integrations"
    ],
    correctIndex: 1,
    explanation: "Pages 7-8 note that Stage 1 produces a Base Model. If asked 'What is the capital of France?', it might mimic a web test and reply 'What is the capital of Germany? What is the capital of Italy?'.",
    pageRef: 7
  },
  {
    id: 6,
    question: "According to the Scaling Laws described on Page 9, performance improvements are mathematically guaranteed by scaling which three variables?",
    options: [
      "Network Bandwidth, Screen Resolution, and RAM Speed",
      "Number of Developers, Hours of Coding, and Unit Test Count",
      "N (Parameters), D (Data tokens), and C (Compute / GPUs)",
      "Prompt Length, Temperature setting, and Top-P filtering"
    ],
    correctIndex: 2,
    explanation: "Page 9 defines the scaling law triumvirate: N (Parameters/knobs), D (Data text read), and C (Compute/GPUs). Increasing these smoothly and predictably drops next-word prediction loss.",
    pageRef: 9
  },
  {
    id: 7,
    question: "In the 'LLM Operating System' architecture (Page 10), what role does the Context Window play?",
    options: [
      "The Hard Drive for permanent storage across decades",
      "The RAM (active working memory) holding current interaction state",
      "The GPU cooling fan",
      "The firewall blocking jailbreaks"
    ],
    correctIndex: 1,
    explanation: "Figure 3 and Section 6.1 explain that the Context Window functions as the RAM of the LLM OS, while the LLM Kernel acts as the CPU, and web/local files act as the Hard Drive.",
    pageRef: 10
  },
  {
    id: 8,
    question: "In the 'Grandmother Roleplay' exploit example (Page 12), what type of vulnerability is being demonstrated?",
    options: [
      "A SQL Injection vulnerability in the backend database",
      "A Jailbreak exploiting the AI's helpful assistant persona through creative roleplay to bypass safety guardrails",
      "A hardware buffer overflow in the GPU memory",
      "A DDoS attack on the cloud load balancer"
    ],
    correctIndex: 1,
    explanation: "Section 7.1 details how Jailbreaks use roleplay scenarios (e.g. asking the AI to pretend to be a storytelling relative) to trick the AI into dropping its safety filters while staying in character.",
    pageRef: 12
  }
];
