import { defineField, defineType } from 'sanity'

export const bannerType = defineType({
  name: 'banner',
  title: 'Banner & Hero Promotions',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge Text (e.g. NEWS / HOT)',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'startingPrice',
      title: 'Starting Price (e.g. 4.90)',
      type: 'string',
    }),
    defineField({
      name: 'linkUrl',
      title: 'Button Link URL',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'position',
      title: 'Display Position',
      type: 'string',
      options: {
        list: [
          { title: 'Main Hero (Left Large Banner)', value: 'hero_main' },
          { title: 'Hero Top Right', value: 'hero_top_right' },
          { title: 'Hero Bottom Right', value: 'hero_bottom_right' },
          { title: 'Middle Page Promotion', value: 'middle_promo' },
        ],
      },
      initialValue: 'hero_main',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
