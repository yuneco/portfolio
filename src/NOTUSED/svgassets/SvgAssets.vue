<template>
  <defs>
    <plant-asset></plant-asset>
    <planet-asset></planet-asset>
    <cnfy-side-asset></cnfy-side-asset>
  </defs>
</template>

<script>
import PlantAsset from './PlantAsset'
import PlanetAsset from './PlanetAsset'
import CnfySideAsset from './CnfySideAsset'

export default {
  name: 'SvgAssets',
  components: { PlantAsset, PlanetAsset, CnfySideAsset }
}
</script>
