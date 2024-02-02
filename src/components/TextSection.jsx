import { Text } from "@react-three/drei"
import { Text3D } from "@react-three/drei"
import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial"
export const TextSection = ({title,subtitle,fontSize,...props}) =>{
          return (
        <group {...props}>
            { !!title &&(
                <Text
                color="white"
                anchorx={"left"}
                anchorY="center"
                position-y={0.25}
                fontSize={fontSize}
                maxWidth={4.5}
                font={"./fonts/DMSerifDisplay-Regular.ttf"}>
                    {title}
                    <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
                </Text>
            )}
      
                <Text
                color="white"
                anchorx={"left"}
                anchorY="top"
                position-y={-1}
                fontSize={0.15}
                maxWidth={4.5}
                font={"./fonts/Inter-Regular.ttf"}>
                    {subtitle}
                    <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
                </Text>
      </group>
//       <group {...props}>
//       { !!title &&(
//           <Text3D
//           color="white"
//           anchorx={"left"}
//           anchorY="center"
//           fontSize={0.52}
//           maxWidth={2.5}
//           font={"./fonts/gentilis_regular.typeface.json"}>
//               {title}
//               <meshStandardMaterial
//       color={"white"}
//       onBeforeCompile={fadeOnBeforeCompileFlat}
//     />
//           </Text3D>
//       )}

//           <Text3D
//           color="white"
//           anchorx={"left"}
//           anchorY="top"
//           position-y={-1.2}
//           fontSize={0.22}
//           maxWidth={2.5}
//           font={"./fonts/gentilis_regular.typeface.json"}>
//               {subtitle}
//               <meshStandardMaterial
//       color={"white"}
//       onBeforeCompile={fadeOnBeforeCompileFlat}
//     />
//           </Text3D>
// </group>
    )
}