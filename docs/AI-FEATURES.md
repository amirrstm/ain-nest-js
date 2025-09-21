# AI Features Guide

This document provides comprehensive information about the AI-powered features in AIN-NestJS, including OpenAI integration, voice processing, and intelligent content generation.

## Table of Contents

- [Overview](#overview)
- [OpenAI Integration](#openai-integration)
- [Voice-to-Resume Generation](#voice-to-resume-generation)
- [AI Resume Generation](#ai-resume-generation)
- [AI Chat System](#ai-chat-system)
- [Content Enhancement](#content-enhancement)
- [Prompt Engineering](#prompt-engineering)
- [Usage Tracking](#usage-tracking)
- [Configuration](#configuration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

AIN-NestJS leverages OpenAI's powerful AI models to provide intelligent resume generation and enhancement capabilities. The platform integrates multiple AI services to create a comprehensive resume building experience.

### Supported AI Models
- **GPT-3.5-turbo**: Fast and cost-effective text generation
- **GPT-4**: Advanced reasoning and higher quality output
- **DALL-E 3**: Image generation capabilities
- **Whisper**: Audio transcription and voice processing

### Key AI Features
- **Voice-to-Resume**: Convert audio recordings to structured resume data
- **AI Resume Generation**: Create complete resumes from job descriptions
- **Content Enhancement**: Improve existing resume sections
- **Conversational AI**: Interactive chat for resume assistance
- **Multi-language Support**: AI content in Persian and English

## OpenAI Integration

### Configuration

The OpenAI integration is configured through environment variables:

```bash
# Required
OPEN_AI_SECRET_KEY=sk-your-openai-api-key-here

# Optional model configurations
OPENAI_DEFAULT_MODEL=gpt-3.5-turbo
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.7
```

### Service Architecture

```typescript
interface OpenAIService {
  // Text generation
  generateText(prompt: string, options?: GenerationOptions): Promise<string>;

  // Audio transcription
  transcribeAudio(audioBuffer: Buffer, language?: string): Promise<string>;

  // Image generation
  generateImage(prompt: string, options?: ImageOptions): Promise<string>;

  // Chat completion
  chatCompletion(messages: ChatMessage[], options?: ChatOptions): Promise<string>;
}
```

### Error Handling

The system implements robust error handling for OpenAI API interactions:

```typescript
try {
  const result = await this.openaiService.generateText(prompt);
  return result;
} catch (error) {
  if (error.code === 'insufficient_quota') {
    throw new PaymentRequiredException('OpenAI quota exceeded');
  } else if (error.code === 'rate_limit_exceeded') {
    throw new TooManyRequestsException('Rate limit exceeded');
  }
  throw new InternalServerErrorException('AI generation failed');
}
```

## Voice-to-Resume Generation

### Overview

The voice-to-resume feature converts audio recordings into structured resume data using OpenAI's Whisper model for transcription and GPT models for data extraction.

### Workflow

1. **Audio Upload**: User uploads audio file (MP3, WAV, M4A)
2. **Transcription**: Whisper converts audio to text
3. **Data Extraction**: GPT extracts structured resume information
4. **Validation**: System validates and formats the extracted data
5. **Resume Creation**: Creates resume with extracted information

### API Usage

```http
POST /api/v1/user/resume/voice-generate
Content-Type: multipart/form-data
Authorization: Bearer JWT_TOKEN

{
  "audio": <audio_file>,
  "language": "en|fa",
  "template_id": "optional_template_id"
}
```

### Supported Audio Formats

| Format | Max Size | Duration | Quality |
|--------|----------|----------|---------|
| MP3 | 25MB | 30 minutes | Recommended |
| WAV | 25MB | 30 minutes | High quality |
| M4A | 25MB | 30 minutes | Good quality |
| FLAC | 25MB | 30 minutes | Lossless |

### Processing Pipeline

```typescript
async processVoiceToResume(audioFile: Buffer, options: VoiceOptions) {
  // Step 1: Transcribe audio
  const transcript = await this.openaiService.transcribeAudio(
    audioFile,
    options.language
  );

  // Step 2: Extract resume data
  const extractionPrompt = this.buildExtractionPrompt(transcript, options.language);
  const structuredData = await this.openaiService.generateText(extractionPrompt);

  // Step 3: Parse and validate
  const resumeData = this.parseResumeData(structuredData);
  const validatedData = await this.validateResumeData(resumeData);

  // Step 4: Create resume
  return this.createResumeFromData(validatedData, options);
}
```

### Voice Processing Tips

#### For Best Results:
- **Clear Audio**: Speak clearly and at moderate pace
- **Quiet Environment**: Minimize background noise
- **Complete Information**: Include all relevant details
- **Structured Speaking**: Organize information by sections

#### Example Voice Script:
```
"My name is John Doe. I am a software engineer with 5 years of experience.
I have worked at ABC Company as a senior developer for 3 years,
where I developed web applications using React and Node.js.
I have a Bachelor's degree in Computer Science from XYZ University.
My skills include JavaScript, Python, React, Node.js, and MongoDB..."
```

## AI Resume Generation

### Occupation-Based Generation

Generate resumes based on job titles and requirements:

```http
POST /api/v1/user/resume/ai-generate
Content-Type: application/json
Authorization: Bearer JWT_TOKEN

{
  "occupation": "Software Engineer",
  "experience_level": "senior",
  "industry": "technology",
  "skills": ["JavaScript", "React", "Node.js"],
  "language": "en",
  "template_id": "optional_template_id"
}
```

### Generation Options

```typescript
interface AIGenerationOptions {
  occupation: string;           // Target job title
  experience_level: 'entry' | 'mid' | 'senior' | 'executive';
  industry?: string;           // Industry focus
  skills?: string[];           // Relevant skills
  education_level?: string;    // Education requirement
  location?: string;           // Geographic location
  language: 'en' | 'fa';      // Output language
  creativity_level?: number;   // 0.1-1.0 (conservative to creative)
  template_id?: string;        // Resume template
}
```

### Smart Content Generation

The system generates contextually relevant content for each resume section:

#### Personal Summary
```typescript
const summaryPrompt = `
Generate a professional summary for a ${options.occupation} with ${options.experience_level} experience.
Focus on key achievements and relevant skills: ${options.skills.join(', ')}.
Language: ${options.language}
Length: 2-3 sentences
Tone: Professional and confident
`;
```

#### Work Experience
```typescript
const experiencePrompt = `
Generate 2-3 realistic work experiences for a ${options.occupation}.
Include company names, positions, durations, and 3-4 achievement bullets per role.
Focus on progression from ${options.experience_level} level.
Industry: ${options.industry}
Skills to highlight: ${options.skills.join(', ')}
Language: ${options.language}
`;
```

#### Skills Section
```typescript
const skillsPrompt = `
Generate a comprehensive skills list for a ${options.occupation}.
Include technical skills, soft skills, and tools.
Base skills: ${options.skills.join(', ')}
Experience level: ${options.experience_level}
Language: ${options.language}
Format: JSON array with categories
`;
```

### Quality Assurance

The system includes multiple quality checks:

1. **Content Validation**: Ensures generated content is relevant and appropriate
2. **Language Detection**: Verifies content matches requested language
3. **Format Consistency**: Maintains consistent formatting across sections
4. **Fact Checking**: Validates realistic job titles, companies, and timelines

## AI Chat System

### Conversational Resume Assistant

The AI chat system provides interactive assistance for resume building:

```http
POST /api/v1/user/chat
Content-Type: application/json
Authorization: Bearer JWT_TOKEN

{
  "message": "Help me write a professional summary for a software engineer",
  "context": {
    "resume_id": "optional_resume_id",
    "section": "summary",
    "current_content": "optional_current_content"
  },
  "language": "en"
}
```

### Chat Features

#### Resume Guidance
- **Section Writing**: Help with specific resume sections
- **Content Improvement**: Enhance existing content
- **Format Suggestions**: Recommend better formatting
- **Industry Insights**: Provide industry-specific advice

#### Interactive Feedback
- **Real-time Suggestions**: Immediate content improvements
- **Multiple Options**: Generate several alternatives
- **Personalization**: Adapt to user's background and goals
- **Language Support**: Bilingual assistance (English/Persian)

### Context Management

The chat system maintains conversation context:

```typescript
interface ChatContext {
  conversation_id: string;
  user_id: string;
  resume_id?: string;
  session_data: {
    occupation?: string;
    experience_level?: string;
    current_section?: string;
    user_preferences: object;
  };
  message_history: ChatMessage[];
}
```

## Content Enhancement

### Section-Specific Enhancement

Improve existing resume content with AI assistance:

#### Experience Enhancement
```http
POST /api/v1/user/resume/enhance-experience
Content-Type: application/json
Authorization: Bearer JWT_TOKEN

{
  "experience_id": "experience_object_id",
  "enhancement_type": "achievements|responsibilities|impact",
  "current_content": "Developed web applications",
  "language": "en"
}
```

#### Skills Optimization
```http
POST /api/v1/user/resume/optimize-skills
Content-Type: application/json
Authorization: Bearer JWT_TOKEN

{
  "current_skills": ["JavaScript", "React"],
  "target_occupation": "Full Stack Developer",
  "language": "en"
}
```

### Enhancement Types

| Type | Description | Use Case |
|------|-------------|----------|
| **Achievements** | Convert responsibilities to achievements | Quantify impact and results |
| **Keywords** | Add industry-relevant keywords | Improve ATS compatibility |
| **Action Verbs** | Replace weak verbs with strong ones | Increase impact and clarity |
| **Quantification** | Add metrics and numbers | Demonstrate measurable results |
| **Technical Details** | Enhance technical descriptions | Show deeper expertise |

## Prompt Engineering

### Prompt Templates

The system uses carefully crafted prompts for consistent results:

#### Base Prompt Structure
```typescript
const basePrompt = {
  role: "You are a professional resume writer with expertise in [INDUSTRY]",
  context: "The user is applying for [POSITION] with [EXPERIENCE] years of experience",
  task: "Generate [CONTENT_TYPE] that is [REQUIREMENTS]",
  constraints: [
    "Length: [LENGTH]",
    "Language: [LANGUAGE]",
    "Tone: Professional",
    "Format: [FORMAT]"
  ],
  examples: "[EXAMPLES_IF_NEEDED]"
};
```

#### Language-Specific Prompts

**English Prompts:**
```typescript
const englishPrompts = {
  summary: "Write a compelling professional summary that highlights key achievements and career goals...",
  experience: "Generate work experience entries with strong action verbs and quantified achievements...",
  skills: "List relevant technical and soft skills appropriate for the target role..."
};
```

**Persian Prompts:**
```typescript
const persianPrompts = {
  summary: "یک خلاصه حرفه‌ای جذاب بنویسید که دستاوردهای کلیدی و اهداف شغلی را برجسته کند...",
  experience: "تجربیات کاری را با فعل‌های قوی و دستاوردهای قابل اندازه‌گیری تولید کنید...",
  skills: "مهارت‌های فنی و نرم مرتبط را برای نقش هدف فهرست کنید..."
};
```

### Prompt Optimization

#### Dynamic Prompt Building
```typescript
buildPrompt(template: string, variables: object): string {
  let prompt = template;

  // Replace variables
  Object.entries(variables).forEach(([key, value]) => {
    prompt = prompt.replace(new RegExp(`\\[${key.toUpperCase()}\\]`, 'g'), value);
  });

  // Add context-specific instructions
  if (variables.industry) {
    prompt += `\nIndustry focus: ${variables.industry}`;
  }

  return prompt;
}
```

#### A/B Testing Prompts
The system supports testing different prompt variations to optimize results:

```typescript
const promptVariants = {
  creative: "Generate creative and unique content that stands out...",
  conservative: "Generate professional and traditional content that follows standard practices...",
  technical: "Focus on technical details and specific technologies..."
};
```

## Usage Tracking

### AI Usage Monitoring

Track AI usage for billing and analytics:

```typescript
interface AIUsage {
  user_id: string;
  plan_id: string;
  usage_type: 'voice_generation' | 'ai_generation' | 'chat' | 'enhancement';
  model_used: string;
  tokens_consumed: number;
  cost: number;
  timestamp: Date;
  success: boolean;
  error_message?: string;
}
```

### Usage Limits

Different subscription plans have different AI usage limits:

```typescript
interface PlanLimits {
  voice_generations_per_month: number;
  ai_generations_per_month: number;
  chat_messages_per_day: number;
  enhancement_requests_per_month: number;
  max_file_size_mb: number;
  available_models: string[];
}
```

### Usage Analytics

Track and analyze AI feature usage:

```http
GET /api/v1/user/analytics/ai-usage
Authorization: Bearer JWT_TOKEN

{
  "period": "current_month",
  "breakdown_by": "feature_type"
}
```

## Configuration

### Environment Variables

```bash
# OpenAI Configuration
OPEN_AI_SECRET_KEY=sk-your-key-here
OPENAI_DEFAULT_MODEL=gpt-3.5-turbo
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.7
OPENAI_MAX_RETRIES=3
OPENAI_TIMEOUT_MS=30000

# Feature Toggles
AI_VOICE_GENERATION_ENABLED=true
AI_RESUME_GENERATION_ENABLED=true
AI_CHAT_ENABLED=true
AI_ENHANCEMENT_ENABLED=true

# Usage Limits
AI_RATE_LIMIT_PER_MINUTE=10
AI_MAX_FILE_SIZE_MB=25
AI_MAX_AUDIO_DURATION_MINUTES=30
```

### Model Configuration

```typescript
const modelConfig = {
  'gpt-3.5-turbo': {
    max_tokens: 2000,
    temperature: 0.7,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0
  },
  'gpt-4': {
    max_tokens: 1500,
    temperature: 0.6,
    top_p: 1.0,
    frequency_penalty: 0.1,
    presence_penalty: 0.1
  }
};
```

## Best Practices

### For Developers

#### 1. Error Handling
```typescript
// Always wrap AI calls in try-catch
try {
  const result = await this.aiService.generate(prompt);
  await this.trackUsage(user, 'generation', true);
  return result;
} catch (error) {
  await this.trackUsage(user, 'generation', false, error.message);
  throw this.handleAIError(error);
}
```

#### 2. Prompt Validation
```typescript
// Validate prompts before sending to AI
validatePrompt(prompt: string): boolean {
  if (prompt.length > MAX_PROMPT_LENGTH) return false;
  if (this.containsInappropriateContent(prompt)) return false;
  return true;
}
```

#### 3. Response Processing
```typescript
// Clean and validate AI responses
processAIResponse(response: string): string {
  return response
    .trim()
    .replace(/\n{3,}/g, '\n\n')  // Normalize line breaks
    .replace(/[^\x00-\x7F]/g, '') // Remove non-ASCII if needed
    .substring(0, MAX_RESPONSE_LENGTH);
}
```

### For Users

#### 1. Voice Recording Tips
- Speak clearly and at moderate pace
- Use a quiet environment
- Organize information by sections
- Include specific details and numbers

#### 2. AI Generation Tips
- Provide detailed job descriptions
- Specify industry and experience level
- Include relevant skills and technologies
- Review and customize generated content

#### 3. Chat Interaction Tips
- Be specific about what you need help with
- Provide context about your background
- Ask follow-up questions for clarification
- Iterate on suggestions to refine results

## Troubleshooting

### Common Issues

#### 1. API Rate Limits
```
Error: Rate limit exceeded
Solution: Implement exponential backoff retry logic
```

#### 2. Audio Processing Failures
```
Error: Unsupported audio format
Solution: Convert to supported format (MP3, WAV, M4A)
```

#### 3. Generation Quality Issues
```
Problem: Generated content is irrelevant
Solution: Improve prompt specificity and context
```

#### 4. Language Detection Problems
```
Problem: Wrong language output
Solution: Explicitly specify language in prompts
```

### Debugging

#### Enable Debug Logging
```bash
# Set environment variable
AI_DEBUG_LOGGING=true
```

#### Monitor API Usage
```typescript
// Track API calls and responses
logger.debug('AI Request', {
  model: options.model,
  prompt_length: prompt.length,
  user_id: user.id
});

logger.debug('AI Response', {
  response_length: response.length,
  tokens_used: usage.total_tokens,
  cost: calculateCost(usage)
});
```

This comprehensive guide covers all aspects of the AI features in AIN-NestJS, from basic usage to advanced configuration and troubleshooting.