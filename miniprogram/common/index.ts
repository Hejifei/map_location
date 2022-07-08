export const MARK_TYPE_RESIDENTIAL_BUILDING = 1;    //  居住类建筑停车设施
export const MARK_TYPE_NON_RESIDENTIAL_BUILDING = 2;    //  非居住类建筑停车设施
export const MARK_TYPE_OFF_STREET_PUBLIC = 3;   //  路外公共停车设施
export const MARK_TYPE_ON_STREET_SIDE = 4;  //  道路停车设施
export const MARK_TYPE_BUILDING_SETBACK = 5;    //  建筑物退让空间停车设施

export const MARK_TYPE_MAP = {
    [MARK_TYPE_RESIDENTIAL_BUILDING]: {
        name: '居住类建筑停车设施',
        img_src: '../../assets/imgs/type_residential_building.png',
        type: MARK_TYPE_RESIDENTIAL_BUILDING,
    },
    [MARK_TYPE_NON_RESIDENTIAL_BUILDING]: {
        name: '非居住类建筑停车设施',
        img_src: '../../assets/imgs/type_non_residential_building.png',
        type: MARK_TYPE_NON_RESIDENTIAL_BUILDING,
    },
    [MARK_TYPE_OFF_STREET_PUBLIC]: {
        name: '路外公共停车设施',
        img_src: '../../assets/imgs/type_off_street_public.png',
        type: MARK_TYPE_OFF_STREET_PUBLIC,
    },
    [MARK_TYPE_ON_STREET_SIDE]: {
        name: '道路停车设施',
        img_src: '../../assets/imgs/type_on_street_side.png',
        type: MARK_TYPE_ON_STREET_SIDE,
    },
    [MARK_TYPE_BUILDING_SETBACK]: {
        name: '建筑物退让空间停车设施',
        img_src: '../../assets/imgs/type_building_setback.png',
        type: MARK_TYPE_BUILDING_SETBACK,
    },
}
