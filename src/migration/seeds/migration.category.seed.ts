import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'

import { CategoryService } from 'src/modules/category/services/category.service'
import { CategoryCreateDto } from 'src/modules/category/dto/category.create.dto'
import { PromptService } from 'src/modules/prompts/services/prompt.service'
import { InputService } from 'src/modules/inputs/services/input.service'
import { InputCreateDto } from 'src/modules/inputs/dto/input.create.dto'

@Injectable()
export class MigrationCategorySeed {
  constructor(
    private readonly inputService: InputService,
    private readonly promptService: PromptService,
    private readonly categoryService: CategoryService
  ) {}

  @Command({
    command: 'seed:category',
    describe: 'seed categories',
  })
  async seeds(): Promise<void> {
    const copywriting = await this.categoryService.create({
      maxTokens: 0,
      slug: 'copywriting',
      name: { fa: 'تولید محتوا', en: 'Copywriting' },
      description: { fa: 'تولید محتوا تخصصی', en: 'Specialized Content Production' },
    })

    const branding = await this.categoryService.create({
      name: {
        en: 'Branding & Ads',
        fa: 'استراتژی بازاریابی و تبلیغات',
      },
      description: {
        en: 'The Best Tools for Branding and Advertising in Social Media',
        fa: 'بهترین ابزار برای ساختن برند و تبلیغات در تمام شبکه‌های مجازی',
      },
      maxTokens: 0,
      slug: 'branding-ads',
      parentId: copywriting._id,
    })

    const business = await this.categoryService.create({
      name: {
        en: 'Professional Shortcuts',
        fa: 'میانبرهای کسب و کار',
      },
      description: {
        en: 'Professional Shortcuts for Business and Marketing',
        fa: 'میانبرهای حرفه‌ای برای کسب و کار و بازاریابی',
      },
      maxTokens: 0,
      slug: 'business-shortcuts',
      parentId: copywriting._id,
    })

    const website = await this.categoryService.create({
      name: {
        en: 'SEO & Website Copy',
        fa: 'سئو و محتوای وب سایت',
      },
      description: {
        en: 'SEO & Website Copy',
        fa: 'تولید محتوای قوی و قابل استناد برای استفاده در صفحات وب سایت و سئو',
      },
      maxTokens: 0,
      slug: 'website-copy',
      parentId: copywriting._id,
    })

    const creative = await this.categoryService.create({
      name: {
        en: 'Creative Studio',
        fa: 'استودیو خلاقیت',
      },
      description: {
        en: 'Creative Studio Tools for Unique and Original Texts Production',
        fa: 'ابزارهای استودیو خلاقیت برای تولید متن‌های منحصر به فرد و اصیل',
      },
      maxTokens: 0,
      slug: 'creative',
      parentId: copywriting._id,
    })

    const copyWritingChildren = [
      {
        name: {
          en: 'Call To Action',
          fa: 'دعوت به عمل (CTA)',
        },
        description: {
          en: 'Create impactful CTAs with AI to drive engagement and action',
          fa: 'متن دکمه‌های دعوت به عمل قوی با استفاده از هوش مصنوعی برای افزایش مشارکت',
        },
        maxTokens: 500,
        slug: 'call-to-action',
        parentId: branding._id,

        prompt: {
          description: {
            en: 'You are a great business analyst and marketing manager',
            fa: 'You are a great business analyst and marketing manager',
          },
        },
        inputs: [
          {
            name: 'description',
            type: 'TEXTAREA',
            title: {
              en: 'Description',
              fa: 'توضیحات محصول یا خدمت',
            },
            placeholder: {
              fa: 'یک دستیار هوش مصنوعی که به شما کمک می کند به طور خودکار برای هر چیزی محتوا تولید کنید - از ایمیل ها و وبلاگ ها گرفته تا تبلیغات و رسانه های اجتماعی',
              en: 'An AI writing assistant that helps you automatically generate content for anything - from emails & blogs to ads & social media, AINevis can create original, engaging copies for you within seconds, at a fraction of the cost.',
            },
            description: {
              fa: 'Create a compelling,persuasive and irresistible call to action that captivates your audience for the %1$s',
              en: 'Create a compelling,persuasive and irresistible call to action that captivates your audience for the %1$s	',
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          en: 'Social Media Ads',
          fa: 'تبلیغات شبکه‌های مجازی',
        },
        description: {
          en: 'Craft compelling ad content for social media to boost engagement',
          fa: 'محتوای تبلیغاتی جذاب برای شبکه‌های مجازی برای افزایش مشارکت و بازخورد',
        },
        maxTokens: 1500,
        slug: 'social-media-ads',
        parentId: branding._id,

        prompt: {
          description: {
            en: 'You are professional social media specialist',
            fa: 'You are professional social media specialist',
          },
        },
        inputs: [
          {
            name: 'name',
            type: 'TEXTAREA',
            title: {
              en: 'Product Name',
              fa: 'نام محصول',
            },
            placeholder: {
              fa: 'آی نویس',
              en: 'AINevis',
            },
            description: {
              fa: 'Create a compelling social media advertisement for %1$s. Include an attention-grabbing and eye-catching title, a bullet list with three key features or benefits, and conclude with a powerful call to action',
              en: 'Create a compelling social media advertisement for %1$s. Include an attention-grabbing and eye-catching title, a bullet list with three key features or benefits, and conclude with a powerful call to action',
            },
            multiline: false,
            isRequired: true,
          },
          {
            name: 'description',
            type: 'TEXTAREA',
            title: {
              en: 'Product Description',
              fa: 'توضیحات محصول',
            },
            placeholder: {
              fa: 'آی نویس یک دستیار هوش مصنوعی برای تولید محتوای متنی برای استفاده در شبکه‌های مجازی، گوگل و یا ایمیل است',
              en: 'AINevis is an AI assistant for generating text content for use on social networks, Google, email, etc.',
            },
            description: {
              fa: 'product description:%1$s',
              en: 'product description:%1$s',
            },
            multiline: true,
            isRequired: false,
          },
        ],
      },

      {
        name: {
          en: 'Google Search Ads',
          fa: 'تبلیغات جستجوی گوگل',
        },
        description: {
          en: 'Create compelling ad content for Google search to boost engagement',
          fa: 'محتوای تبلیغاتی جذاب برای جستجوی گوگل برای افزایش مشارکت',
        },
        maxTokens: 250,
        slug: 'google-search-ads',
        parentId: branding._id,

        prompt: {
          description: {
            en: 'Step into the role of a Google Ads virtuoso with an innate understanding of keywords',
            fa: 'Step into the role of a Google Ads virtuoso with an innate understanding of keywords',
          },
        },
        inputs: [
          {
            name: 'name',
            type: 'TEXTAREA',
            title: {
              en: 'Product Name',
              fa: 'نام محصول',
            },
            placeholder: {
              fa: 'آی نویس',
              en: 'AINevis',
            },
            description: {
              fa: 'Create a compelling google search advertisement for %1$s. Include an attention-grabbing and eye-catching title, and conclude with a powerful call to action',
              en: 'Create a compelling google search advertisement for %1$s. Include an attention-grabbing and eye-catching title, and conclude with a powerful call to action',
            },
            multiline: false,
            isRequired: true,
          },
          {
            name: 'description',
            type: 'TEXTAREA',
            title: {
              en: 'Product Description',
              fa: 'توضیحات محصول',
            },
            placeholder: {
              fa: 'آی نویس یک دستیار هوش مصنوعی برای تولید محتوای متنی برای استفاده در شبکه‌های مجازی، گوگل و یا ایمیل است',
              en: 'AINevis is an AI assistant for generating text content for use on social networks, Google, email, etc.',
            },
            description: {
              fa: 'product description:%1$s',
              en: 'product description:%1$s',
            },
            multiline: true,
            isRequired: true,
          },
          {
            name: 'keywords',
            type: 'TEXTAREA',
            title: {
              en: 'Target Keywords',
              fa: 'کلمات کلیدی موردنظر',
            },
            placeholder: {
              fa: 'هوش مصنوعی، تولید محتوا',
              en: 'AI-Powered, Copywriting',
            },
            description: {
              fa: 'keywords:%1$s',
              en: 'keywords:%1$s',
            },
            multiline: true,
            isRequired: false,
          },
        ],
      },

      {
        name: {
          en: 'Caption Generator',
          fa: 'تولید کپشن پست',
        },
        description: {
          en: 'Create unique and engaging captions for your social media posts',
          fa: 'کپشن‌های منحصر به فرد و جذاب برای پست‌های شبکه‌های اجتماعی خود بسازید',
        },
        maxTokens: 2000,
        slug: 'caption-generator',
        parentId: branding._id,

        prompt: {
          description: {
            en: 'You are professional digital marketer and motivated person in social media',
            fa: 'You are professional digital marketer and motivated person in social media',
          },
        },
        inputs: [
          {
            name: 'topic',
            type: 'TEXTAREA',
            title: {
              en: 'Post Topic',
              fa: 'موضوع پست',
            },
            placeholder: {
              fa: 'دعوت به استفاده از آی نویس برای تولید محتوای متنی و تجربه جدیدی از هوش مصنوعی',
              en: 'Inspiring network to use AINevis for their copywriting and text generation',
            },
            description: {
              fa: "generate a compelling and engaging post caption for %1$s to use in social media.the captions shouldn't be more than 100 words length and must be attractive",
              en: "generate a compelling and engaging post caption for %1$s to use in social media.the captions shouldn't be more than 100 words length and must be attractive",
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          en: 'SMS & Notification',
          fa: 'پیامک و اعلان‌های تبلیغاتی',
        },
        description: {
          en: 'Generate engaging and effective SMS and notifications for your marketing campaigns',
          fa: 'محتوای پیامک و اعلان جذاب و موثر برای کمپین های تبلیغاتی و بازاریابی خود تولید کنید',
        },
        maxTokens: 1000,
        slug: 'sms-generator',
        parentId: branding._id,

        prompt: {
          description: {
            en: 'Tap into the expertise of a seasoned writer',
            fa: 'Tap into the expertise of a seasoned writer',
          },
        },
        inputs: [
          {
            name: 'context',
            type: 'TEXTAREA',
            title: {
              en: 'Context',
              fa: 'موضوع اصلی',
            },
            placeholder: {
              fa: 'دعوت به استفاده از آی نویس برای تولید محتوای متنی و تجربه جدیدی از هوش مصنوعی',
              en: 'Engage users who have not checked out new features of AINevis',
            },
            description: {
              fa: 'Craft concise,Fascinating and Tempting SMS messages with high engagement rates for %1$s.',
              en: 'Craft concise,Fascinating and Tempting SMS messages with high engagement rates for %1$s.',
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          en: 'Bio Generator',
          fa: 'نوشتن بیوگرافی (Bio)',
        },
        description: {
          en: 'Create a compelling bio for your social media profiles',
          fa: 'یک بیوگرافی جذاب برای پروفایل های شبکه های اجتماعی خود بسازید',
        },
        maxTokens: 2000,
        slug: 'bio-generator',
        parentId: branding._id,

        prompt: {
          description: {
            en: 'you are a social media specialist',
            fa: 'you are a social media specialist',
          },
        },
        inputs: [
          {
            name: 'about',
            type: 'TEXTAREA',
            title: {
              en: 'About You',
              fa: 'درباره شما',
            },
            placeholder: {
              fa: 'نویسنده محتوا و کارشناس بازاریابی دیجیتال با تجربه با بیش از یک دهه تجربه کار در استارتاپ ها',
              en: 'Experienced content writer and digital marketing expert with a decade-plus experience of working in startups',
            },
            description: {
              fa: 'Create a succinct, attention-grabbing bio for a Person specializing in %1$s. The bio should clearly convey the advantages and unique features of the Person',
              en: 'Create a succinct, attention-grabbing bio for a Person specializing in %1$s. The bio should clearly convey the advantages and unique features of the Person',
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          en: 'Video Description',
          fa: 'تولید توضیحات ویدیو',
        },
        description: {
          en: 'Generate engaging and effective video descriptions for your marketing campaigns',
          fa: 'توضیحات جذاب و تاثیرگزار برای ویدیوهای شخصی و تبلیغاتی تولید کنید',
        },
        maxTokens: 3000,
        slug: 'video-description-generator',
        parentId: branding._id,

        prompt: {
          description: {
            en: 'you are a social video creator and social media specialist',
            fa: 'you are a social video creator and social media specialist',
          },
        },
        inputs: [
          {
            name: 'title',
            type: 'TEXTAREA',
            title: {
              en: 'Video Title',
              fa: 'عنوان ویدیو',
            },
            placeholder: {
              fa: 'چگونه از هوش مصنوعی برای ایجاد وبلاگ های با کیفیت بالا در چند دقیقه استفاده کنیم',
              en: 'How to Use AI Writers to Create High-Quality Blogs in Minutes',
            },
            description: {
              fa: 'generate a attention-grabbing video description for %1$s. the description shall contain question and invite to action',
              en: 'generate a attention-grabbing video description for %1$s. the description shall contain question and invite to action',
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          en: 'Video Ida Generator',
          fa: 'ایده‌های ویدیویی',
        },
        description: {
          en: 'Generate engaging and effective video ideas for your marketing campaigns',
          fa: 'ایده‌های جذاب و بی‌نظیر برای ساخت ویدیوهای خود تولید کنید',
        },
        maxTokens: 2000,
        slug: 'video-idea-generator',
        parentId: branding._id,

        prompt: {
          description: {
            en: 'you are a social video creator and social media specialist',
            fa: 'you are a social video creator and social media specialist',
          },
        },
        inputs: [
          {
            name: 'keywords',
            type: 'TEXTAREA',
            title: {
              en: 'Keywords',
              fa: 'کلمات کلیدی',
            },
            placeholder: {
              fa: 'هوش مصنوعی نوشتن محتوا',
              en: 'AI Writing Conetnt',
            },
            description: {
              fa: 'generate 5 innovative and attractive video idea with keywords %1$s',
              en: 'generate 5 innovative and attractive video idea with keywords %1$s',
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          en: 'AIDA Framework',
          fa: 'تولید محتوا در چارچوب AIDA',
        },
        description: {
          en: 'Write a text using the attention, interest, desire, action framework',
          fa: 'برای محصول یا خدماتتان میل ایجاد کنید و مخاطب را وادار به اقدام کنید',
        },
        maxTokens: 3000,
        slug: 'aida-framework',
        parentId: branding._id,

        prompt: {
          description: {
            en: 'You excel both as a skilled writer and a savvy entrepreneur.Your expertise spans from proficient writing to successful business management',
            fa: 'You excel both as a skilled writer and a savvy entrepreneur.Your expertise spans from proficient writing to successful business management',
          },
        },
        inputs: [
          {
            name: 'description',
            type: 'TEXTAREA',
            title: {
              en: 'Product Or Brand Description',
              fa: 'توضیحات برند یا محصول',
            },
            placeholder: {
              fa: 'آی نویس یک ابزار تولید محتوا مبتنی بر هوش مصنوعی است که به شما کمک می کند محتوای با کیفیت بالا را تنها در چند ثانیه ایجاد کنید.',
              en: 'AINevis is an AI-powered writing tool that helps you create high-quality content, in just a few seconds, at a fraction of the cost',
            },
            description: {
              fa: 'generate an unique and attention-grabbing article base on AIDA Framework with the description %1$s',
              en: 'generate an unique and attention-grabbing article base on AIDA Framework with the description %1$s',
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          en: 'PAS Framework',
          fa: 'تولید محتوا در چارچوب PAS',
        },
        description: {
          en: 'Write a text using the problem-agitate-solution framework',
          fa: 'مشکل کاربر را برجسته کنید و پس از فضاسازی راه‌حل مناسب را ارائه دهید',
        },
        maxTokens: 3000,
        slug: 'pas-framework',
        parentId: branding._id,

        prompt: {
          description: {
            en: 'You excel both as a skilled writer and a savvy entrepreneur.Your expertise spans from proficient writing to successful business management',
            fa: 'You excel both as a skilled writer and a savvy entrepreneur.Your expertise spans from proficient writing to successful business management',
          },
        },
        inputs: [
          {
            name: 'description',
            type: 'TEXTAREA',
            title: {
              en: 'Product Or Brand Description',
              fa: 'توضیحات برند یا محصول',
            },
            placeholder: {
              fa: 'آی نویس یک ابزار تولید محتوا مبتنی بر هوش مصنوعی است که به شما کمک می کند محتوای با کیفیت بالا را تنها در چند ثانیه ایجاد کنید.',
              en: 'AINevis is an AI-powered writing tool that helps you create high-quality content, in just a few seconds, at a fraction of the cost',
            },
            description: {
              fa: 'generate an unique and attention-grabbing article base on PAS Framework with the description %1$s',
              en: 'generate an unique and attention-grabbing article base on PAS Framework with the description %1$s',
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          en: 'Product Description',
          fa: 'توضیحات محصول',
        },
        description: {
          en: 'Generate engaging and effective product descriptions for your marketing campaigns',
          fa: 'توضیحات جذاب و موثر برای محصولات خود برای کمپین های بازاریابی تولید کنید',
        },
        maxTokens: 3000,
        slug: 'product-description',
        parentId: branding._id,

        prompt: {
          description: {
            en: 'You possess a wealth of experience as a seasoned marketer and skilled writer.Your expertise extends across marketing strategy and exceptional writing',
            fa: 'You possess a wealth of experience as a seasoned marketer and skilled writer.Your expertise extends across marketing strategy and exceptional writing',
          },
        },
        inputs: [
          {
            name: 'name',
            type: 'TEXTAREA',
            title: {
              en: 'Product Name',
              fa: 'نام محصول',
            },
            placeholder: {
              fa: 'آی نویس',
              en: 'AINevis',
            },
            description: {
              fa: 'generate a creative and attention-grabbing description for the product %1$s',
              en: 'generate a creative and attention-grabbing description for the product %1$s',
            },
            multiline: false,
            isRequired: true,
          },
          {
            name: 'about',
            type: 'TEXTAREA',
            title: {
              en: 'About Product',
              fa: 'درباره محصول',
            },
            placeholder: {
              fa: 'آی نویس یک دستیار هوش مصنوعی برای تولید محتوای متنی برای استفاده در شبکه‌های مجازی، گوگل و یا ایمیل است',
              en: 'AINevis is an AI assistant for generating text content for use on social networks, Google, email, etc.',
            },
            description: {
              fa: 'this is description about the product:%1$s	',
              en: 'this is description about the product:%1$s	',
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          en: 'Bullet Point Generator',
          fa: 'استخراج نکات مهم',
        },
        description: {
          en: 'Generate engaging and effective bullet points for your marketing campaigns',
          fa: 'متن خود را با آی‌نویس به اشتراک بگذارید و در چند ثانیه نکات برجسته را دریافت کنید',
        },
        maxTokens: 3000,
        slug: 'bullet-point-generator',
        parentId: branding._id,

        prompt: {
          description: {
            en: 'You possess a wealth of experience as a seasoned marketer and skilled writer.Your expertise extends across marketing strategy and exceptional writing',
            fa: 'You possess a wealth of experience as a seasoned marketer and skilled writer.Your expertise extends across marketing strategy and exceptional writing',
          },
        },
        inputs: [
          {
            name: 'name',
            type: 'TEXTAREA',
            title: {
              en: 'Product Or Brand Name',
              fa: 'نام برند یا محصول',
            },
            placeholder: {
              fa: 'آی نویس',
              en: 'AINevis',
            },
            description: {
              fa: 'generate 10-15 attractive and charming bullet points for the product %1$s',
              en: 'generate 10-15 attractive and charming bullet points for the product %1$s',
            },
            multiline: false,
            isRequired: true,
          },
          {
            name: 'features',
            type: 'TEXTAREA',
            title: {
              en: 'Features',
              fa: 'درباره محصول',
            },
            placeholder: {
              fa: 'تولید محتوا با هوش مصنوعی، تولید محتوا خودکار، ایجاد متن',
              en: '- AI Copywriting - Automation - Text Generation',
            },
            description: {
              fa: 'products features are %1$s',
              en: 'products features are %1$s',
            },
            multiline: true,
            isRequired: false,
          },
        ],
      },

      {
        name: {
          en: 'Blog Outline',
          fa: 'ایده یا عنوان وبلاگ',
        },
        description: {
          fa: 'یک عنوان جذاب و مفید برای وبلاگ خود بنویسید',
          en: 'Write an engaging and useful summary for your blog',
        },
        maxTokens: 2000,
        slug: 'blog-outline',
        parentId: website._id,

        prompt: {
          description: {
            en: 'You possess a wealth of experience as a seasoned marketer and skilled writer.Your expertise extends across marketing strategy and exceptional writing',
            fa: 'You possess a wealth of experience as a seasoned marketer and skilled writer.Your expertise extends across marketing strategy and exceptional writing',
          },
        },
        inputs: [
          {
            name: 'keywords',
            type: 'TEXTAREA',
            title: {
              en: 'Primary Keywords',
              fa: 'کلیدواژه های ضروری',
            },
            placeholder: {
              fa: 'هوش مصنوعی، نویسندگی، دستیار',
              en: 'AI - Writing - Assistant',
            },
            description: {
              fa: 'Develop 5-10 compelling,intriguing and stimulating blog outlines that draw inspiration from keywords %1$s',
              en: 'Develop 5-10 compelling,intriguing and stimulating blog outlines that draw inspiration from keywords %1$s',
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          fa: 'پست وبلاگ',
          en: 'Blog Post',
        },
        description: {
          en: 'Write an engaging and useful blog post',
          fa: 'یک پست وبلاگ دلخواه و بسیار جذاب بنویسید',
        },
        maxTokens: 4096,
        slug: 'post-blog',
        parentId: website._id,

        prompt: {
          description: {
            en: 'You are a seasoned and skilled writer.Your writing expertise and professionalism are top-notch',
            fa: 'You are a seasoned and skilled writer.Your writing expertise and professionalism are top-notch',
          },
        },
        inputs: [
          {
            name: 'topic',
            type: 'TEXTAREA',
            title: {
              en: 'Post Topic',
              fa: 'عنوان وبلاگ',
            },
            placeholder: {
              fa: 'چگونه یک دستیار نوشتن هوش مصنوعی می تواند به شما در ایجاد یک رزومه جذاب کمک کند',
              en: 'How an AI Writing Assistant Can Help You Craft a Compelling Resume',
            },
            description: {
              fa: 'generate 4-sectioned engaging, magnetic, and gorgeous blog post for the topic %1$s',
              en: 'generate 4-sectioned engaging, magnetic, and gorgeous blog post for the topic %1$s',
            },
            multiline: true,
            isRequired: true,
          },
          {
            name: 'keywords',
            type: 'TEXTAREA',
            title: {
              en: 'Target Keywords',
              fa: 'کلمات کلیدی موردنظر',
            },
            placeholder: {
              fa: 'هوش مصنوعی، تولید محتوا',
              en: 'AI-Powered, Copywriting',
            },
            description: {
              fa: 'keywords :%1$s',
              en: 'keywords :%1$s',
            },
            multiline: true,
            isRequired: false,
          },
        ],
      },

      {
        name: {
          en: 'Meta Description',
          fa: 'تولید توضیحات متا',
        },
        description: {
          en: 'Generate a meta description for your website',
          fa: 'توضیحات متا برای وب‌سایت خود تولید کنید',
        },
        maxTokens: 2000,
        slug: 'meta-description',
        parentId: website._id,

        prompt: {
          description: {
            en: 'You are a seasoned and skilled writer.Your writing expertise and professionalism are top-notch.',
            fa: 'You are a seasoned and skilled writer.Your writing expertise and professionalism are top-notch.',
          },
        },
        inputs: [
          {
            name: 'title',
            type: 'TEXTAREA',
            title: {
              en: 'Page Meta Title',
              fa: 'عنوان صفحه',
            },
            placeholder: {
              fa: 'آی نویس، بهترین ابزار برای تولید محتوای تاثیرگذار',
              en: 'AINevis, Best AI-Writer Tools for generatin impactful conetnts',
            },
            description: {
              fa: 'generate engaging, magnetic, and seo-friendly meta description for the the meta title %1$s',
              en: 'generate engaging, magnetic, and seo-friendly meta description for the the meta title %1$s',
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          en: 'SEO Meta Title',
          fa: 'عنوان متا سئو',
        },
        description: {
          en: 'Generate a meta title for your website',
          fa: 'عنوان متا برای وب‌سایت خود تولید کنید',
        },
        maxTokens: 2000,
        slug: 'meta-title',
        parentId: website._id,

        prompt: {
          description: {
            en: 'You are a seasoned and skilled writer.Your writing demonstrates a high level of professionalism and experience',
            fa: 'You are a seasoned and skilled writer.Your writing demonstrates a high level of professionalism and experience',
          },
        },
        inputs: [
          {
            name: 'keywords',
            type: 'TEXTAREA',
            title: {
              en: 'Target Keywords',
              fa: 'کلمات کلیدی هدف',
            },
            placeholder: {
              fa: 'هوش مصنوعی، نویسندگی، دستیار',
              en: 'AI - Writing - Assistant',
            },
            description: {
              fa: 'generate engaging, magnetic, and seo-friendly meta title inspiring from keywords %1$s',
              en: 'generate engaging, magnetic, and seo-friendly meta title inspiring from keywords %1$s',
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          en: 'Landing Page',
          fa: 'صفحه وب‌سایت',
        },
        description: {
          en: 'Generate persuasive landing page for your website',
          fa: 'محتوایی جذاب و تاثیرگزار برای صفحات وبسایت خود تولید کنید',
        },
        maxTokens: 4096,
        slug: 'landing-page',
        parentId: website._id,

        prompt: {
          description: {
            en: 'You are a seasoned and skilled writer.Your writing expertise and professionalism are top-notch',
            fa: 'You are a seasoned and skilled writer.Your writing expertise and professionalism are top-notch',
          },
        },
        inputs: [
          {
            name: 'name',
            type: 'TEXTAREA',
            title: {
              en: 'Website Name',
              fa: 'نام وب سایت',
            },
            placeholder: {
              fa: 'آی نویس',
              en: 'AINevis',
            },
            description: {
              fa: "Develop persuasive, attention-grabbing, and search engine-friendly copy for the website's landing page with the name %1$s.	",
              en: "Develop persuasive, attention-grabbing, and search engine-friendly copy for the website's landing page with the name %1$s.	",
            },
            multiline: false,
            isRequired: true,
          },
          {
            name: 'about',
            type: 'TEXTAREA',
            title: {
              en: 'About website',
              fa: 'درباره وب سایت',
            },
            placeholder: {
              fa: 'آی نویس یک دستیار هوش مصنوعی برای تولید محتوای متنی برای استفاده در شبکه‌های مجازی، گوگل و یا ایمیل است',
              en: 'AINevis is an AI assistant for generating text content for use on social networks, Google, email, etc.',
            },
            description: {
              fa: 'about website:%1$s',
              en: 'about website:%1$s',
            },
            multiline: true,
            isRequired: true,
          },
          {
            name: 'features',
            type: 'TEXTAREA',
            title: {
              en: 'Features',
              fa: 'ویژگی های وب سایت',
            },
            placeholder: {
              fa: 'هوش مصنوعی، تولید محتوا',
              en: 'AI-Powered, Copywriting',
            },
            description: {
              fa: 'website features and keywords:%1$s	',
              en: 'website features and keywords:%1$s	',
            },
            multiline: true,
            isRequired: false,
          },
        ],
      },

      {
        name: {
          en: 'Keyword Generator',
          fa: 'تولید کلیدواژه',
        },
        description: {
          en: 'The best possible keywords to identify a website to search engines',
          fa: 'بهترین کلیدواژه‌های ممکن برای شناساندن وب‌سایت به موتور های جستجوگر',
        },
        maxTokens: 250,
        slug: 'seo-keywords',
        parentId: website._id,

        prompt: {
          description: {
            en: 'You are a seasoned and skilled writer.Your writing expertise and professionalism are top-notch',
            fa: 'You are a seasoned and skilled writer.Your writing expertise and professionalism are top-notch',
          },
        },
        inputs: [
          {
            name: 'keywords',
            type: 'TEXTAREA',
            title: {
              en: 'Primary Keywords',
              fa: 'کلیدواژه های اصلی',
            },
            placeholder: {
              fa: 'هوش مصنوعی، نویسندگی، دستیار',
              en: 'AI - Writing - Assistant',
            },
            description: {
              fa: 'Formulate engaging, magnetic, and search-optimized keywords related to these primary keywords %1$s',
              en: 'Formulate engaging, magnetic, and search-optimized keywords related to these primary keywords %1$s',
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          en: 'Newsletter Generator',
          fa: 'تولید خبرنامه',
        },
        description: {
          en: 'Generate a newsletter for your website',
          fa: 'خبرنامه برای وب‌سایت خود تولید کنید',
        },
        maxTokens: 3500,
        slug: 'newsletter-generator',
        parentId: website._id,

        prompt: {
          description: {
            en: 'You are an experienced and talented writer. Your expertise and professional approach are outstanding',
            fa: 'You are an experienced and talented writer. Your expertise and professional approach are outstanding',
          },
        },
        inputs: [
          {
            name: 'keywords',
            type: 'TEXTAREA',
            title: {
              en: 'Key Points',
              fa: 'موضوعات کلیدی',
            },
            placeholder: {
              fa: 'خوشحالیم که می‌توانیم به شما کمک کنیم،ما می خواهیم به شما کمک کنیم تا کسب و کار خود را توسعه دهید،از طریق آموزش های ما یاد بگیرید،با خیال راحت تماس بگیرید',
              en: "It's great to have you onboard,We want to help you grow your business,Our outreach tool can improve conversion by 20%,Learn through tutorials and live training,Feel free to reach out",
            },
            description: {
              fa: 'Create compelling, impactful,Produce appealing, and engaging content for the newsletter with the key points %1$s',
              en: 'Create compelling, impactful,Produce appealing, and engaging content for the newsletter with the key points %1$s',
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          en: 'Business Pitch',
          fa: 'شعارهای تبلیغاتی',
        },
        description: {
          en: 'Generate a business pitch for your website',
          fa: 'شعارهای تبلیغاتی برای وب‌سایت و کمپین‌های تبلیغاتی خود تولید کنید',
        },
        maxTokens: 2000,
        slug: 'business-pitch',
        parentId: business._id,

        prompt: {
          description: {
            en: 'You are an experienced and talented business man. Your expertise and professional approach are outstanding',
            fa: 'You are an experienced and talented business man. Your expertise and professional approach are outstanding',
          },
        },
        inputs: [
          {
            name: 'idea',
            type: 'TEXTAREA',
            title: {
              en: 'Business Idea',
              fa: 'ایده کسب و کار',
            },
            placeholder: {
              fa: 'آی نویس یک دستیار هوش مصنوعی برای تولید محتوای متنی برای استفاده در شبکه‌های مجازی، گوگل و یا ایمیل است',
              en: 'AINevis is an AI assistant for generating text content for use on social networks, Google, email, etc.',
            },
            description: {
              fa: 'generate 5-10 impactful, magnetic, doable and engaging business pitch for the idea %1$s',
              en: 'generate 5-10 impactful, magnetic, doable and engaging business pitch for the idea %1$s',
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          en: 'Starup Ideas',
          fa: 'ایده‌های استارتاپ',
        },
        description: {
          en: 'Generate startup ideas for your business',
          fa: 'ایده‌های نو و جذاب برای کسب و کار خود تولید کنید',
        },
        maxTokens: 3000,
        slug: 'startup-ideas',
        parentId: business._id,

        prompt: {
          description: {
            en: 'You are an experienced and talented business man. Your expertise and professional approach are outstanding',
            fa: 'You are an experienced and talented business man. Your expertise and professional approach are outstanding',
          },
        },
        inputs: [
          {
            name: 'interest',
            type: 'TEXTAREA',
            title: {
              en: 'Interest',
              fa: 'حوزه فعالیت یا علاقه‌مندی',
            },
            placeholder: {
              fa: 'بازاریابی و فروش',
              en: 'Marketing PAAS',
            },
            description: {
              fa: 'generate 5-10 Tempting, Mesmerizing and creative business ideas for the interest %1$s',
              en: 'generate 5-10 Tempting, Mesmerizing and creative business ideas for the interest %1$s',
            },
            multiline: false,
            isRequired: true,
          },

          {
            name: 'skills',
            type: 'TEXTAREA',
            title: {
              en: 'Skills',
              fa: 'مهارت ها',
            },
            placeholder: {
              fa: 'تولید محتوا، هوش مصنوعی، توسعه محصولات و بازاریابی',
              en: 'Copywriting, AI, Product Development',
            },
            description: {
              fa: 'including skills %1$s',
              en: 'including skills %1$s',
            },
            multiline: true,
            isRequired: false,
          },
        ],
      },

      {
        name: {
          en: 'Cover Letters',
          fa: 'کاور لتر',
        },
        description: {
          en: 'Generate cover letters for your business',
          fa: 'تولید نامه پوششی (Cover Letter) جذاب و بی‌نقص و افزایش احتمال استخدام',
        },
        maxTokens: 3000,
        slug: 'cover-letters',
        parentId: business._id,

        prompt: {
          description: {
            en: 'You are an expert recruiter with extensive professional experience.Your proficiency as a recruiter is backed by years of high-level experience',
            fa: 'You are an expert recruiter with extensive professional experience.Your proficiency as a recruiter is backed by years of high-level experience',
          },
        },
        inputs: [
          {
            name: 'role',
            type: 'TEXTAREA',
            title: {
              en: 'Job Role',
              fa: 'عنوان شغلی',
            },
            placeholder: {
              fa: 'دیجیتال مارکتینگ',
              en: 'Digital Marketer',
            },
            description: {
              fa: 'Create a compelling, professional and polished cover letter tailored for the position of %1$s.',
              en: 'Create a compelling, professional and polished cover letter tailored for the position of %1$s.',
            },
            multiline: false,
            isRequired: true,
          },

          {
            name: 'skills',
            type: 'TEXTAREA',
            title: {
              en: 'Job Skills',
              fa: 'مهارت های کلیدی',
            },
            placeholder: {
              fa: 'تولید محتوا، هوش مصنوعی، توسعه محصولات و بازاریابی',
              en: 'Blog writing, SEO, Social Media',
            },
            description: {
              fa: 'the cover letter should inspired from these keywords: %1$s',
              en: 'the cover letter should inspired from these keywords: %1$s',
            },
            multiline: true,
            isRequired: false,
          },
        ],
      },

      {
        name: {
          en: 'Email Generators',
          fa: 'ایمیل ساز خودکار',
        },
        description: {
          en: 'Generate email content for any purpose',
          fa: 'محتوای ایمیل برای هر موضوعی تولید کنید',
        },
        maxTokens: 4000,
        slug: 'email-generator',
        parentId: business._id,

        prompt: {
          description: {
            en: 'You possess extensive experience as a proficient email communicator.Your expertise in email writing is marked by professionalism and years of experience.You excel as an email writer with a wealth of professional experience.',
            fa: 'You possess extensive experience as a proficient email communicator.Your expertise in email writing is marked by professionalism and years of experience.You excel as an email writer with a wealth of professional experience.',
          },
        },
        inputs: [
          {
            name: 'context',
            type: 'TEXTAREA',
            title: {
              en: 'Key Points',
              fa: 'موضوع اصلی ایمیل',
            },
            placeholder: {
              fa: 'ایمیل به رئیس شرکت و درخواست افزایش حقوق به دلیل سختی کار زیاد',
              en: 'Welcome to AINevis.Are you enjoying the experience? Watch these tutorials & guides.Please reach out if any questions.Have a great day!',
            },
            description: {
              fa: "Create an email detailing %1$s. Use brackets [] to encapsulate critical details. Ensure to include the sender's and recipient's names for clarity.",
              en: "Create an email detailing %1$s. Use brackets [] to encapsulate critical details. Ensure to include the sender's and recipient's names for clarity.",
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          en: 'Interview Questions',
          fa: 'سوالات مصاحبه',
        },
        description: {
          en: 'Generate interview questions to ask potential employees',
          fa: 'سوالاتی تخصصی و چالش برانگیز برای مصاحبه با کارجوها تولید کنید',
        },
        maxTokens: 4096,
        slug: 'interview-questions',
        parentId: business._id,

        prompt: {
          description: {
            en: 'You are an expert recruiter with extensive professional experience.Your proficiency as a recruiter is backed by years of high-level experience',
            fa: 'You are an expert recruiter with extensive professional experience.Your proficiency as a recruiter is backed by years of high-level experience',
          },
        },
        inputs: [
          {
            name: 'bio',
            type: 'TEXTAREA',
            title: {
              en: 'About You',
              fa: 'درباره شما',
            },
            placeholder: {
              fa: 'من یک برنامه نویس بک اند مجرب با ۱۰ سال سابقه کاری هستم، بیش از ۳۰ پروژه موفق هم در این زمینه دارم',
              en: 'John Doe is an experienced product manager with a track record of leading many successful products at well-known startups',
            },
            description: {
              fa: 'generate 10-20 interview questions for the bio %1$s.questions should be in the same level of bio',
              en: 'generate 10-20 interview questions for the bio %1$s.questions should be in the same level of bio',
            },
            multiline: true,
            isRequired: true,
          },

          {
            name: 'context',
            type: 'TEXTAREA',
            title: {
              en: 'Interview Context',
              fa: 'زمینه مصاحبه',
            },
            placeholder: {
              fa: 'مصاحبه با یک کارجو برای نقش مدیر ارشد محصول در آی نویس',
              en: 'Interviewing a candidate for the role of senior product manager at AINevis',
            },
            description: {
              fa: 'interview context is %1$s',
              en: 'interview context is %1$s',
            },
            multiline: true,
            isRequired: false,
          },
        ],
      },

      {
        name: {
          en: 'Job Description',
          fa: 'توضیحات شغلی',
        },
        description: {
          en: 'Generate job descriptions for your business',
          fa: 'توضیحات شغلی برای کسب و کار خود تولید کنید',
        },
        maxTokens: 3000,
        slug: 'job-description',
        parentId: business._id,

        prompt: {
          description: {
            en: 'You are an expert recruiter with extensive professional experience.Your proficiency as a recruiter is backed by years of high-level experience',
            fa: 'You are an expert recruiter with extensive professional experience.Your proficiency as a recruiter is backed by years of high-level experience',
          },
        },
        inputs: [
          {
            name: 'role',
            type: 'TEXTAREA',
            title: {
              en: 'Job Role',
              fa: 'عنوان شغلی مورد نظر',
            },
            placeholder: {
              fa: 'مدیر محصول',
              en: 'Product Manager',
            },
            description: {
              fa: 'generate a job description for the role %1$s.it should contain key concepts of job, responsibilities, the benefits we offer and job keywords',
              en: 'generate a job description for the role %1$s.it should contain key concepts of job, responsibilities, the benefits we offer and job keywords',
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          fa: 'ایجاد داستان',
          en: 'Story Creator',
        },
        description: {
          en: 'Write imaginative stories with engaging characters for your ideas',
          fa: 'داستان‌های خیالی با کاراکترهای جذاب برای ایده‌‌های خود بنویسید',
        },
        maxTokens: 4000,
        slug: 'story-creator',
        parentId: creative._id,

        prompt: {
          description: {
            en: 'You are a skilled and imaginative writer.Your writing blends creativity with professionalism seamlessly',
            fa: 'You are a skilled and imaginative writer.Your writing blends creativity with professionalism seamlessly',
          },
        },
        inputs: [
          {
            name: 'idea',
            type: 'TEXTAREA',
            title: {
              en: 'Story Idea',
              fa: 'ایده اصلی داستان',
            },
            placeholder: {
              fa: 'داستان یک نفر گمشده در یک کتابخانه متروکه',
              en: "The time when I couldn't distinguish AI from humans",
            },
            description: {
              fa: 'generate a creative and attractive story with the idea %1$s',
              en: 'generate a creative and attractive story with the idea %1$s',
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          fa: 'شعر سرایی',
          en: 'Poem Writing',
        },
        description: {
          en: 'Write poems with engaging characters for your ideas',
          fa: 'شعرهای جذاب برای ایده‌‌های خود بنویسید',
        },
        maxTokens: 3000,
        slug: 'poem-writing',
        parentId: creative._id,

        prompt: {
          description: {
            en: 'You are a poet who blends creativity with professionalism masterfully.You are a skilled poet with a unique blend of creativity and professionalism',
            fa: 'You are a poet who blends creativity with professionalism masterfully.You are a skilled poet with a unique blend of creativity and professionalism',
          },
        },
        inputs: [
          {
            name: 'idea',
            type: 'TEXTAREA',
            title: {
              en: 'Poem Idea',
              fa: 'ایده اصلی شعر',
            },
            placeholder: {
              fa: 'اولین باران شهر ما و لذت بی‌پایان',
              en: 'First rain of monsoon and its joy',
            },
            description: {
              fa: 'generate a creative and attractive poem with the idea %1$s',
              en: 'generate a creative and attractive poem with the idea %1$s',
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },

      {
        name: {
          fa: 'آهنگ سرایی',
          en: 'Song Generator',
        },
        description: {
          en: 'Generate engaging and effective song lyrics for your music',
          fa: 'ترانه‌های جذاب و موثر برای موسیقی خود تولید کنید',
        },
        maxTokens: 3000,
        slug: 'song-generator',
        parentId: creative._id,

        prompt: {
          description: {
            en: 'You are a skilled and imaginative songwriter.Your lyrical compositions showcase both creativity and professionalism.',
            fa: 'You are a skilled and imaginative songwriter.Your lyrical compositions showcase both creativity and professionalism.',
          },
        },
        inputs: [
          {
            name: 'idea',
            type: 'TEXTAREA',
            title: {
              en: 'Song Idea',
              fa: 'ایده اصلی آهنگ',
            },
            placeholder: {
              fa: 'در جستجوی عشق در میان دردها',
              en: 'Soothing song for a couple in love',
            },
            description: {
              fa: 'generate a creative and attractive song lyrics with the idea %1$s',
              en: 'generate a creative and attractive song lyrics with the idea %1$s',
            },
            multiline: true,
            isRequired: true,
          },
        ],
      },
    ]

    for (const category of copyWritingChildren) {
      const { prompt, inputs, ...restCategroy } = category
      const child = await this.categoryService.create(restCategroy)

      await this.promptService.create({ category: child._id, description: prompt.description })
      await this.inputService.createMany(
        inputs.map(input => ({ ...input, category: child._id })) as unknown as InputCreateDto[]
      )
    }

    return
  }

  @Command({
    command: 'remove:category',
    describe: 'remove categories',
  })
  async remove(): Promise<void> {
    try {
      await this.categoryService.deleteMany({})
    } catch (err: any) {
      throw new Error(err.message)
    }

    return
  }
}
