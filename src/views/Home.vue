<template>
  <div class="home">
    <BaseTopNavigation/>
    <BaseTabPerspective/>
  </div>
</template>

<script>

import BaseTopNavigation from "@/components/dashboard/BaseTopNavigation"
import BaseTabPerspective from "@/components/dashboard/BaseTabPerspective"

export default {
  name: "Home",
  components: {
    BaseTopNavigation,
    BaseTabPerspective
  }
};
</script>
