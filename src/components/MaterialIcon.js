import Material from 'react-native-vector-icons/MaterialIcons';
import GlobalColors from '../constants/GlobalColors';

function MaterialIcon({name, size, color}) {
  Material.loadFont().then();

  return (
    <Material
      name={name ? name : 'person'}
      size={size ? size : 16}
      color={color ? color : GlobalColors.black}
    />
  );
}

export default MaterialIcon;
