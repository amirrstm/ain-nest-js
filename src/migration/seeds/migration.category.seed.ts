import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'

import { CategoryService } from 'src/modules/category/services/category.service'
import { CategoryCreateDto } from 'src/modules/category/dto/category.create.dto'

@Injectable()
export class MigrationCategorySeed {
  constructor(private readonly categoryService: CategoryService) {}

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
        fa: 'میابرهای کسب و کار',
      },
      description: {
        en: 'Professional Shortcuts for Business and Marketing',
        fa: 'میابرهای حرفه‌ای برای کسب و کار و بازاریابی',
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

    const copyWritingChildren: CategoryCreateDto[] = [
      {
        name: {
          en: 'Call To Action',
          fa: 'اقدام به عمل',
        },
        description: {
          en: 'Create impactful CTAs with AI to drive engagement and action.',
          fa: 'اقدام‌های به عمل قوی با استفاده از هوش مصنوعی برای افزایش مشارکت و عمل',
        },
        maxTokens: 250,
        slug: 'call-to-action',
        parentId: branding._id,
      },

      {
        name: {
          en: 'Social Media Ads',
          fa: 'تبلیغات شبکه‌های مجازی',
        },
        description: {
          en: 'Craft compelling ad content for social media to boost engagement.',
          fa: 'محتوای تبلیغاتی جذاب برای شبکه‌های مجازی برای افزایش مشارکت',
        },
        maxTokens: 250,
        slug: 'social-media-ads',
        parentId: branding._id,
      },

      {
        name: {
          en: 'Google Search Ads',
          fa: 'تبلیغات جستجوی گوگل',
        },
        description: {
          en: 'Create compelling ad content for Google search to boost engagement.',
          fa: 'محتوای تبلیغاتی جذاب برای جستجوی گوگل برای افزایش مشارکت',
        },
        maxTokens: 250,
        slug: 'google-search-ads',
        parentId: branding._id,
      },

      {
        name: {
          en: 'Caption Generator',
          fa: 'تولید کپشن پست',
        },
        description: {
          en: 'Create unique and engaging captions for your social media posts.',
          fa: 'کپشن‌های منحصر به فرد و جذاب برای پست‌های شبکه‌های اجتماعی خود بسازید.',
        },
        maxTokens: 250,
        slug: 'caption-generator',
        parentId: branding._id,
      },

      {
        name: {
          en: 'SMS Generator',
          fa: 'متن پیامک',
        },
        description: {
          en: 'Generate engaging and effective SMS content for your marketing campaigns.',
          fa: 'محتوای پیامک جذاب و موثر برای کمپین های بازاریابی خود تولید کنید.',
        },
        maxTokens: 250,
        slug: 'sms-generator',
        parentId: branding._id,
      },

      {
        name: {
          en: 'Bio Generator',
          fa: 'ایجاد بیوگرافی',
        },
        description: {
          en: 'Create a compelling bio for your social media profiles.',
          fa: 'یک بیوگرافی جذاب برای پروفایل های شبکه های اجتماعی خود بسازید.',
        },
        maxTokens: 250,
        slug: 'bio-generator',
        parentId: branding._id,
      },

      {
        name: {
          en: 'Video Description',
          fa: 'تولید توضیحات ویدیو',
        },
        description: {
          en: 'Generate engaging and effective video descriptions for your marketing campaigns.',
          fa: 'توضیحات جذاب و موثر برای ویدیوهای خود برای کمپین های بازاریابی تولید کنید.',
        },
        maxTokens: 250,
        slug: 'video-description-generator',
        parentId: branding._id,
      },

      {
        name: {
          en: 'Video Ida Generator',
          fa: 'ایده‌های ویدیویی',
        },
        description: {
          en: 'Generate engaging and effective video ideas for your marketing campaigns.',
          fa: 'ایده‌های جذاب و موثر برای ویدیوهای خود برای کمپین های بازاریابی تولید کنید.',
        },
        maxTokens: 250,
        slug: 'video-idea-generator',
        parentId: branding._id,
      },

      {
        name: {
          fa: 'چارچوب تولید محتوا (AIDA)',
          en: 'AIDA Framework',
        },
        description: {
          en: 'Write a text using the attention, interest, desire, action framework.',
          fa: 'ابتدا توجه آن‌ها را جلب کنید، سپس با ایجاد تمایل، آن‌ها را به انجام عمل مورد نظر ترغیب کنید',
        },
        maxTokens: 250,
        slug: 'aida-framework',
        parentId: branding._id,
      },

      {
        name: {
          en: 'PAS Framework',
          fa: 'چارچوب تولید محتوا (PAS)',
        },
        description: {
          en: 'Write a text using the problem-agitate-solution framework.',
          fa: 'ابتدا طرح چالش کنید، سپس آن را تحریک کرده و در نهایت با ارائه‌ی راه‌حل مناسب، آن‌ها را به رسیدن به راه‌حل مشکلشان ترغیب کنید',
        },
        maxTokens: 250,
        slug: 'pas-framework',
        parentId: branding._id,
      },

      {
        name: {
          en: 'Product Description',
          fa: 'توضیحات محصول',
        },
        description: {
          en: 'Generate engaging and effective product descriptions for your marketing campaigns.',
          fa: 'توضیحات جذاب و موثر برای محصولات خود برای کمپین های بازاریابی تولید کنید.',
        },
        maxTokens: 250,
        slug: 'product-description',
        parentId: branding._id,
      },

      {
        name: {
          en: 'Bullet Point Generator',
          fa: 'استخراج نکات مهم',
        },
        description: {
          en: 'Generate engaging and effective bullet points for your marketing campaigns.',
          fa: 'نکات جذاب و موثر برای کمپین های بازاریابی خود تولید کنید.',
        },
        maxTokens: 250,
        slug: 'bullet-point-generator',
        parentId: branding._id,
      },

      {
        name: {
          en: 'Blog Outline',
          fa: 'خلاصه وبلاگ',
        },
        description: {
          fa: 'خلاصه‌ای جذاب و مفید برای وبلاگ خود بنویسید',
          en: 'Write an engaging and useful summary for your blog',
        },
        maxTokens: 250,
        slug: 'ideal-title',
        parentId: website._id,
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
        maxTokens: 250,
        slug: 'post-blog',
        parentId: website._id,
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
        maxTokens: 250,
        slug: 'meta-description',
        parentId: website._id,
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
        maxTokens: 250,
        slug: 'meta-title',
        parentId: website._id,
      },
      {
        name: {
          en: 'Landing Page',
          fa: 'صفحه وب‌سایت',
        },
        description: {
          en: 'Generate persuasive landing page for your website',
          fa: 'صفحه وب‌سایت جذاب و پرمخاطب برای خود تولید کنید',
        },
        maxTokens: 250,
        slug: 'landing-page',
        parentId: website._id,
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
        maxTokens: 250,
        slug: 'newsletter-generatro',
        parentId: website._id,
      },

      {
        name: {
          en: 'Business Pitch',
          fa: 'شعارهای تبلیغاتی',
        },
        description: {
          en: 'Generate a business pitch for your website',
          fa: 'شعارهای تبلیغاتی برای وب‌سایت خود تولید کنید',
        },
        maxTokens: 250,
        slug: 'business-pitch',
        parentId: business._id,
      },

      {
        name: {
          en: 'Starup Ideas',
          fa: 'ایده‌های استارتاپ',
        },
        description: {
          en: 'Generate startup ideas for your business',
          fa: 'ایده‌های استارتاپ برای کسب و کار خود تولید کنید',
        },
        maxTokens: 250,
        slug: 'startup-ideas',
        parentId: business._id,
      },

      {
        name: {
          en: 'Cover Letters',
          fa: 'نامه‌های اداری و کاری',
        },
        description: {
          en: 'Generate cover letters for your business',
          fa: 'نامه‌های اداری و کاری برای کسب و کار خود تولید کنید',
        },
        maxTokens: 250,
        slug: 'cover-letters',
        parentId: business._id,
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
        maxTokens: 250,
        slug: 'email-generator',
        parentId: business._id,
      },

      {
        name: {
          en: 'Interview Questions',
          fa: 'سوالات مصاحبه',
        },
        description: {
          en: 'Generate interview questions to ask potential employees',
          fa: 'سوالات مصاحبه برای پرسیدن از کارمندان تولید کنید',
        },
        maxTokens: 250,
        slug: 'interview-questions',
        parentId: business._id,
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
        maxTokens: 250,
        slug: 'job-description',
        parentId: business._id,
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
        maxTokens: 250,
        slug: 'story-creator',
        parentId: creative._id,
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
        maxTokens: 250,
        slug: 'poem-writing',
        parentId: creative._id,
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
        maxTokens: 250,
        slug: 'song-generator',
        parentId: creative._id,
      },
    ]

    await this.categoryService.createMany(copyWritingChildren)

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
