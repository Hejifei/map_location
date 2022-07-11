// export const REQUEST_URL = 'http://gmap.dev.zhangxinkeji.com'
export const REQUEST_URL = 'https://gmap.dev.zhangxinkeji.com'

export const ERROR_CODE_NEED_LOGIN = 401  //  错误码,需要重新登录

export const MARK_TYPE_RESIDENTIAL_BUILDING = 1;    //  居住类建筑停车设施
export const MARK_TYPE_NON_RESIDENTIAL_BUILDING = 2;    //  非居住类建筑停车设施
export const MARK_TYPE_OFF_STREET_PUBLIC = 3;   //  路外公共停车设施
export const MARK_TYPE_ON_STREET_SIDE = 4;  //  道路停车设施
export const MARK_TYPE_BUILDING_SETBACK = 5;    //  建筑物退让空间停车设施

export const MARK_TYPE_MAP: Record<number, {
  name: string
  img_src: string
  type: number
  url: string
}> = {
    [MARK_TYPE_RESIDENTIAL_BUILDING]: {
        name: '居住类建筑停车设施',
        img_src: '../../assets/imgs/type_residential_building.png',
        type: MARK_TYPE_RESIDENTIAL_BUILDING,
        url: '/pages/mark_add/residential_building/residential_building'
    },
    [MARK_TYPE_NON_RESIDENTIAL_BUILDING]: {
        name: '非居住类建筑停车设施',
        img_src: '../../assets/imgs/type_non_residential_building.png',
        type: MARK_TYPE_NON_RESIDENTIAL_BUILDING,
        url: '/pages/mark_add/non_residential_building/non_residential_building',
    },
    [MARK_TYPE_OFF_STREET_PUBLIC]: {
        name: '路外公共停车设施',
        img_src: '../../assets/imgs/type_off_street_public.png',
        type: MARK_TYPE_OFF_STREET_PUBLIC,
        url: "/pages/mark_add/off_street_public/off_street_public",
    },
    [MARK_TYPE_ON_STREET_SIDE]: {
        name: '道路停车设施',
        img_src: '../../assets/imgs/type_on_street_side.png',
        type: MARK_TYPE_ON_STREET_SIDE,
        url: '/pages/mark_add/on_street_side/on_street_side',
    },
    [MARK_TYPE_BUILDING_SETBACK]: {
        name: '建筑物退让空间停车设施',
        img_src: '../../assets/imgs/type_building_setback.png',
        type: MARK_TYPE_BUILDING_SETBACK,
        url: '/pages/mark_add/building_setback/building_setback',
    },
}
