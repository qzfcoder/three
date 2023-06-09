import { addNodeMaterial } from './NodeMaterial.js';
import { transformedClearcoatNormalView } from '../accessors/NormalNode.js';
import { clearcoat, clearcoatRoughness } from '../core/PropertyNode.js';
import { materialClearcoatNormal } from '../accessors/ExtendedMaterialNode.js';
import { materialClearcoat, materialClearcoatRoughness } from '../accessors/MaterialNode.js';
import { float, vec3 } from '../shadernode/ShaderNode.js';
import MeshStandardNodeMaterial from './MeshStandardNodeMaterial.js';

import { MeshPhysicalMaterial } from 'three';

const defaultValues = new MeshPhysicalMaterial();

class MeshPhysicalNodeMaterial extends MeshStandardNodeMaterial {

	constructor( parameters ) {

		super();

		this.isMeshPhysicalNodeMaterial = true;

		this.clearcoatNode = null;
		this.clearcoatRoughnessNode = null;
		this.clearcoatNormalNode = null;

		this.sheenNode = null;
		this.sheenRoughnessNode = null;

		this.iridescenceNode = null;
		this.iridescenceIORNode = null;
		this.iridescenceThicknessNode = null;

		this.specularIntensityNode = null;
		this.specularColorNode = null;

		this.transmissionNode = null;
		this.thicknessNode = null;
		this.attenuationDistanceNode = null;
		this.attenuationColorNode = null;

		this.setDefaultValues( defaultValues );

		this.setValues( parameters );

	}

	constructVariants( builder ) {

		super.constructVariants( builder );

		const { stack } = builder;

		// CLEARCOAT

		const clearcoatNode = this.clearcoatNode ? float( this.clearcoatNode ) : materialClearcoat;
		const clearcoatRoughnessNode = this.clearcoatRoughnessNode ? float( this.clearcoatRoughnessNode ) : materialClearcoatRoughness;

		stack.assign( clearcoat, clearcoatNode );
		stack.assign( clearcoatRoughness, clearcoatRoughnessNode );

	}

	constructNormal( builder ) {

		super.constructNormal( builder );

		// CLEARCOAT NORMAL

		const clearcoatNormalNode = this.clearcoatNormalNode ? vec3( this.clearcoatNormalNode ) : materialClearcoatNormal;

		builder.stack.assign( transformedClearcoatNormalView, clearcoatNormalNode );

	}

	copy( source ) {

		this.clearcoatNode = source.clearcoatNode;
		this.clearcoatRoughnessNode = source.clearcoatRoughnessNode;
		this.clearcoatNormalNode = source.clearcoatNormalNode;

		this.sheenNode = source.sheenNode;
		this.sheenRoughnessNode = source.sheenRoughnessNode;

		this.iridescenceNode = source.iridescenceNode;
		this.iridescenceIORNode = source.iridescenceIORNode;
		this.iridescenceThicknessNode = source.iridescenceThicknessNode;

		this.specularIntensityNode = source.specularIntensityNode;
		this.specularColorNode = source.specularColorNode;

		this.transmissionNode = source.transmissionNode;
		this.thicknessNode = source.thicknessNode;
		this.attenuationDistanceNode = source.attenuationDistanceNode;
		this.attenuationColorNode = source.attenuationColorNode;

		return super.copy( source );

	}

}

export default MeshPhysicalNodeMaterial;

addNodeMaterial( MeshPhysicalNodeMaterial );