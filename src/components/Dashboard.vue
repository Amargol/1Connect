<template lang="html">
  <div id="nonNav">
    <el-radio-group class="option" v-model="settingsOrData">
      <el-radio-button label="Settings"></el-radio-button>
      <el-radio-button label="Data"></el-radio-button>
    </el-radio-group>
    <div class="stngs" v-if="settingsOrData === 'Settings'">
      <el-card class="box-card">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="Company Name">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
          <el-form-item label="Access Key">
            <el-tooltip class="item" effect="dark" content="(Optional) Only people with the correct key can register" placement="right">
              <el-switch on-text="" off-text="" v-model="form.accessKeyNeeded"></el-switch>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="Access Key" v-show="form.accessKeyNeeded">
              <el-input v-model="form.accessKey"></el-input>
          </el-form-item>
          <el-form-item label="Rewards">
            <el-table
              :data="tableData"
              >
              <el-table-column
                prop="Reward"
                label="Reward"
                width="180">
              </el-table-column>
              <el-table-column
                prop="Cost"
                label="Cost"
                >
              </el-table-column>
            </el-table>
            <el-button type="primary" @click="addReward = true">Add Reward</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateNameAndKey">Create</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-dialog title="Add Reward" :visible.sync="addReward">
        <el-form ref="form" :model="rewardsForm" label-width="120px">
          <el-form-item label="Reward Name">
            <el-input v-model="rewardsForm.rewardName"></el-input>
          </el-form-item>
          <el-form-item label="Cost In Points">
            <el-tooltip class="item" effect="dark" content="Estimate 1000 points per dollar" placement="left">
              <el-input v-model="rewardsForm.costInPoints"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="Image">
            <el-tooltip class="item" effect="dark" content="(Optional) Include a photo of the reward" placement="right">
              <el-switch on-text="" off-text="" v-model="rewardsForm.rewardPhotoIncluded"></el-switch>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="Image URL" v-show="rewardsForm.rewardPhotoIncluded">
            <el-input v-model="rewardsForm.imageURL"></el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-tooltip class="item" effect="dark" content="(Optional) Include a description of the reward" placement="right">
              <el-switch on-text="" off-text="" v-model="rewardsForm.rewardDescriptionIncluded"></el-switch>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="Description" v-show="rewardsForm.rewardDescriptionIncluded">
            <el-input v-model="rewardsForm.rewardDescription"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="setReward">Add</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      addReward: false,
      settingsOrData: 'Settings',
      form: {
        companyName: '',
        accessKey: '',
        accessKeyNeeded: false
      },
      rewardsForm: {
        costInPoints: 1000,
        rewardName: '',
        imageURL: '',
        rewardDescription: '',
        rewardPhotoIncluded: false,
        rewardDescriptionIncluded: false
      }
    }
  },
  methods: {
    updateNameAndKey () {
      this.$store.dispatch('setNameAndKey', this.form)
      this.$message({
        message: 'Successfully Created',
        type: 'success'
      })
    },
    deleteReward (e) {
      this.$store.dispatch('deleteReward', e)
    },
    setReward () {
      this.$store.dispatch('setReward', this.rewardsForm)
      this.rewardsForm = {
        costInPoints: 1000,
        rewardName: '',
        imageURL: '',
        rewardDescription: '',
        rewardPhotoIncluded: false,
        rewardDescriptionIncluded: false
      }
      this.addReward = false
      this.$message({
        message: 'Successfully Created',
        type: 'success'
      })
    },
    getRewards () {
      this.$store.dispatch('getRewards')
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    rewards () {
      return this.$store.getters.rewards
    },
    tableData () {
      return this.rewards.map(obj => {
        console.log({
          Reward: obj[1].rewardName,
          Cost: obj[1].costInPoints + ' points'
        })
        return {
          Reward: obj[1].rewardName,
          Cost: obj[1].costInPoints + ' points'
        }
      })
    }
  },
  created () {
    if (this.user === null) {
      this.$router.push('/')
    }
    this.getRewards()
  },
  watch: {
    user (value) {
      if (value === null) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="css" scoped>
  #nonNav {
    text-align: center;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .option {
    margin: 15px;
  }
  .stngs {
    padding: 0 150px 20px 150px;
    text-align: left;
  }
  .box-card {
    margin-bottom: 15px;
  }
</style>
