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
    const copyParent: CategoryCreateDto = {
      slug: 'copywriting',
      name: { fa: 'تولید محتوا' },
      description: { fa: 'تولید محتوا تخصصی' },
    }
    const copywriting = await this.categoryService.create(copyParent)

    const branding = await this.categoryService.create({
      name: {
        en: 'Branding & Ads',
        fa: 'برند سازی و تبلیغات',
      },
      description: {
        en: 'The Best Tools for Branding and Advertising in Social Media',
        fa: 'بهترین ابزار برای ساختن برند و تبلیغات در تمام شبکه‌های مجازی',
      },
      slug: 'branding-ads',
      parentId: copywriting._id,
    })

    const websiteCopy = await this.categoryService.create({
      name: {
        en: 'Website Copy',
        fa: 'محتوای وب سایت',
      },
      description: {
        en: 'Website Copy',
        fa: 'تولید محتوای قوی و قابل استناد برای استفاده در صفحات وب سایت و سئو',
      },
      slug: 'website-copy',
      parentId: copywriting._id,
    })

    const socialMedia = await this.categoryService.create({
      name: {
        en: 'Social Media',
        fa: 'شبکه های مجازی',
      },
      description: {
        en: 'Social Media',
        fa: 'متن های نوآورانه و جذاب برای استفاده در صفحات شبکه‌های مجازی',
      },
      slug: 'social-media',
      parentId: copywriting._id,
    })

    const publication = await this.categoryService.create({
      name: {
        en: 'Publication',
        fa: 'ویراستاری',
      },
      description: {
        en: 'Publication',
        fa: 'ابزار هوشمند تولید متن های بدون سرقت ادبی و کاملا بی‌همتا',
      },
      slug: 'publication',
      parentId: copywriting._id,
    })

    const other = await this.categoryService.create({
      name: {
        en: 'Other',
        fa: 'دیگر',
      },
      description: {
        en: 'Other',
        fa: 'دیگر ابزارهای مورد استفاده برای تولید محتوا',
      },
      slug: 'other',
      parentId: copywriting._id,
    })

    const copyWritingChildren: CategoryCreateDto[] = [
      {
        name: {
          fa: 'تبلیغات گوگل',
        },
        description: {
          fa: 'از تبلیغات گوگل برای تبدیل کاربران به مشتریان وفادار استفاده کنید',
        },
        slug: 'google-ads',
        parentId: branding._id,
      },
      {
        name: {
          fa: 'ایده یا عنوان یوتیوب',
        },
        description: {
          fa: 'ایده یا عنوان جذاب برای یوتیوب با نرخ کلیک بالا ایجاد کنید',
        },
        slug: 'youtube-title-idea',
        parentId: branding._id,
      },
      {
        name: {
          fa: 'کپشن اینستاگرام',
        },
        description: {
          fa: 'به سرعت کپشن‌های حرفه‌ای و هیجان‌انگیز تولید کنید',
        },
        slug: 'instagram-caption',
        parentId: branding._id,
      },
      {
        name: {
          fa: 'توییت',
        },
        description: {
          fa: 'توییت‌های جذاب و فالورپسند برای توییتر بنویسید',
        },
        slug: 'tweets',
        parentId: branding._id,
      },
      {
        name: {
          fa: 'چارچوب تولید محتوا (AIDA)',
        },
        description: {
          fa: 'ابتدا توجه مخاطب را جلب کنید، سپس علاقه‌اش را برانگیزید، او را به درخواست محصول یا خدماتتان ترغیب کنید و در نهایت او را به اقدام دعوت کنید',
        },
        slug: 'aida-framework',
        parentId: websiteCopy._id,
      },
      {
        name: {
          fa: 'چارچوب تولید محتوا (PAS)',
        },
        description: {
          fa: 'ابتدا طرح چالش کنید، سپس آن را تحریک کرده و در نهایت با ارائه‌ی راه‌حل مناسب، آن‌ها را به رسیدن به راه‌حل مشکلشان ترغیب کنید',
        },
        slug: 'pas-framework',
        parentId: websiteCopy._id,
      },
      {
        name: {
          fa: 'پست وبلاگ',
        },
        description: {
          fa: 'یک پست وبلاگ دلخواه و بسیار جذاب بنویسید',
        },
        slug: 'post-blog',
        parentId: websiteCopy._id,
      },
      {
        name: {
          fa: 'کلیدواژه‌های سئو',
        },
        description: {
          fa: 'بهترین کلیدواژه‌های ممکن برای شناساندن وب‌سایت به موتور های جستجوگر',
        },
        slug: 'seo-keywords',
        parentId: websiteCopy._id,
      },
      {
        name: {
          fa: 'عنوان ساز',
        },
        description: {
          fa: 'تولید عنوان های جذاب و کاربرپسند برای وبلاگ، پست و شبکه‌های اجتماعی',
        },
        slug: 'title-generator',
        parentId: websiteCopy._id,
      },
      {
        name: {
          fa: 'پست لینکدین',
        },
        description: {
          fa: 'پست های جذاب و حرفه‌ای برای لینکدین بسازید',
        },
        slug: 'linkedin-post',
        parentId: socialMedia._id,
      },
      {
        name: {
          fa: 'پاسخ دیدگاه',
        },
        description: {
          fa: 'به دیدگاه‌های مشتریان خود، حرفه‌ای و دقیق پاسخ دهید',
        },
        slug: 'review-responder',
        parentId: socialMedia._id,
      },
      {
        name: {
          fa: 'هشتگ ساز',
        },
        description: {
          fa: 'هشتگ های جذاب و قدرتمند برای شبکه‌های اجتماعی بسازید',
        },
        slug: 'hashtag-generator',
        parentId: socialMedia._id,
      },
      {
        name: {
          fa: 'ایجاد داستان',
        },
        description: {
          fa: 'داستان‌های خیالی با کاراکترهای جذاب برای ایده‌‌های خود بنویسید',
        },
        slug: 'story-creator',
        parentId: publication._id,
      },
      {
        name: {
          fa: 'شرح و بسط',
        },
        description: {
          fa: 'محتوای خود را با آب و تاب بیشتری توصیف کنید',
        },
        slug: 'content-expandor',
        parentId: publication._id,
      },
      {
        name: {
          fa: 'نوشتن ایمیل',
        },
        description: {
          fa: 'ایمیل های تاثیرگذار و حرفه‌ای برای هر زمینه‌ای',
        },
        slug: 'email',
        parentId: publication._id,
      },
      {
        name: {
          fa: 'پرسش و پاسخ',
        },
        description: {
          fa: 'پرسش و پاسخ های متداول در زمینه‌‌های مختلف',
        },
        slug: 'question-answer',
        parentId: other._id,
      },
      {
        name: {
          fa: 'ایده‌های استارتاپی',
        },
        description: {
          fa: 'بر اساس کلماتی که در ذهن‌تان میگذرد، کسب و کار خود را راه اندازی کنید',
        },
        slug: 'startup-ideas',
        parentId: other._id,
      },
      {
        name: {
          fa: 'تبریک مناسبتی',
        },
        description: {
          fa: 'تبریک تولد، ارتقای شغل، ازدواج و یا هرمناسبت دیگری را جذاب تر کنید',
        },
        slug: 'festivity-letters',
        parentId: other._id,
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
