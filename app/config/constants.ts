import { MaterialCommunityIconsSet } from "../components/icon/types"
import defaultStyles from "./default.styles"

export type Selection ={
    label: string,
    value: number,
    icon?: MaterialCommunityIconsSet,
    background_color?: string 
  }

const categories : Selection[] = [
    {label:"Funiture", value:1, icon: 'chair-rolling', background_color : defaultStyles.colors.primary },
    {label:"Clothing", value:2, icon: 'tshirt-crew', background_color: defaultStyles.colors.danger },
    {label:"Cameras", value:3, icon: 'camera', background_color: 'green'},
    {label:"Fashion", value:4, icon: 'shoe-heel', background_color : defaultStyles.colors.secondary },
    {label:"Music & Sound", value:5, icon: 'music', background_color: defaultStyles.colors.danger },
    {label:"Sport", value:6, icon: 'tennis', background_color: defaultStyles.colors.dark_gey}
]

export default {
    categories
}