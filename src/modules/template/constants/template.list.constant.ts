import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from 'src/common/pagination/constants/pagination.enum.constant'

import { ENUM_TEMPLATE_TYPE } from './template.enum.constant'

export const TEMPLATE_DEFAULT_ORDER_BY = 'createdAt'
export const TEMPLATE_DEFAULT_PER_PAGE = 20
export const TEMPLATE_DEFAULT_IS_ACTIVE = [true, false]
export const TEMPLATE_DEFAULT_AVAILABLE_SEARCH = ['name']
export const TEMPLATE_DEFAULT_TYPE = Object.values(ENUM_TEMPLATE_TYPE)
export const TEMPLATE_DEFAULT_AVAILABLE_ORDER_BY = ['name', 'createdAt']
export const TEMPLATE_DEFAULT_ORDER_DIRECTION = ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC
