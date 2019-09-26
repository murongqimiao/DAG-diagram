<template>
  <div class="main-panel">
    <div class="control-menu">
      <span class="button" @click="sizeExpand">
        <Tooltip content="Expand Graph" placement="bottom">
          <div class="inner-button">
            <Icon type="md-add" size="20" />
          </div>
        </Tooltip>
      </span>
      <span class="button" @click="sizeShrink">
        <Tooltip content="Shrink Graph" placement="bottom">
          <div class="inner-button">
            <Icon type="md-remove" size="20" />
          </div>
        </Tooltip>
      </span>
      <span class="button" @click="sizeInit">
        <Tooltip content="Reset Graph" placement="bottom">
          <div class="inner-button">
            <Icon type="md-close" size="20" />
          </div>
        </Tooltip>
      </span>
      <span class="button" @click="refreshLayout">
        <Tooltip content="Refresh Layout" placement="bottom">
          <div class="inner-button">
            <Icon type="md-refresh" size="20" />
          </div>
        </Tooltip>
      </span>
    </div>
  </div>
</template>

<script>
import { SIZE_CHANGE_TYPE } from "@/utils/enums";
import { mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions([
      "changeSize"
    ]),
    ...mapMutations([
      "updateLayout",
      "changeSvgOffset"
    ]),
    sizeInit() {
      this.changeSize({ change_type: SIZE_CHANGE_TYPE.INITIAL });
      this.changeSvgOffset({ offset_x: 0, offset_y: 0 });
    },
    sizeExpand() {
      this.changeSize({ change_type: SIZE_CHANGE_TYPE.EXPAND }).catch(err => {
        alert(err);
      });
    },
    sizeShrink() {
      this.changeSize({ change_type: SIZE_CHANGE_TYPE.SHRINK }).catch(err => {
        alert(err);
      });
    },
    refreshLayout() {
      this.updateLayout();
    }
  }
};
</script>

<style lang="scss" scoped>
  .main-panel {
    width: 180px;
    height: 30px;
  }
  .control-menu {
    height: 30px;
    width: 180px;
    background: #cccccc;
    justify-content: space-around;
    display: flex;
    user-select: none;
    .button {
      height: 20px;
      width: 20px;
      cursor: pointer;
      margin: auto;
      .inner-button {
        &:hover {
          transform: scale(1.4);
        }
      }
    }
  }
</style>
