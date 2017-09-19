<template>
  <div id="app">
    <nav>
      <div>
        <h1>1Connect</h1>
      </div>
      <div class="flexspace"></div>
      <div v-if="!signedIn">
        <el-dialog title="Sign Up" :visible.sync="signUpVisible">
          <el-form :model="signup">
            <el-form-item label="Email" :label-width="formLabelWidth">
              <el-input v-model="signup.email" placeholder="johndoe@gmail.com" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Password" :label-width="formLabelWidth">
              <el-input v-model="signup.password" placeholder="Password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Confirm" :label-width="formLabelWidth">
              <el-input v-model="signup.cpassword" placeholder="Confirm Password" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="signUpVisible = false">Cancel</el-button>
            <el-button type="primary" @click="onSignUp">Sign Up</el-button>
          </span>
        </el-dialog>

        <el-dialog title="Sign In" :visible.sync="signInVisible">
          <el-form :model="signin">
            <el-form-item label="Email" :label-width="formLabelWidth">
              <el-input v-model="signin.email" placeholder="johndoe@gmail.com" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Password" :label-width="formLabelWidth">
              <el-input v-model="signin.password" placeholder="Password" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="signInVisible = false">Cancel</el-button>
            <el-button type="primary" @click="onSignIn">Sign In</el-button>
          </span>
        </el-dialog>

        <el-button type="text" class="sgnin" @click="signInVisible = true"><h3>Sign In</h3></el-button>
        <el-button type="primary" @click="signUpVisible = true"><h3>Sign Up</h3></el-button>
      </div>
      <div v-if="signedIn">
        <el-button type="primary" @click="onSignOut"><h3>Sign Out</h3></el-button>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      signUpVisible: false,
      signInVisible: false,
      signup: {
        email: '',
        password: '',
        cpassword: ''
      },
      signin: {
        email: '',
        password: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    onSignUp () {
      this.signUpVisible = false
      this.$store.dispatch('signUserUp', {email: this.signup.email, password: this.signup.password})
    },
    onSignIn () {
      this.signInVisible = false
      this.$store.dispatch('signUserIn', {email: this.signin.email, password: this.signin.password})
    },
    onSignOut () {
      this.$store.dispatch('signUserOut')
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    signedIn () {
      return this.$store.getters.user !== null
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/employer/dashboard')
      }
    }
  }
}
</script>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
h1, h2, h3, h4 {
  margin: 0;
}
nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
  background-color: #eee;
}
nav > .flexspace {
  flex: 2;
}
.sgnin {
  padding-left: 10px;
  padding-right: 10px;
}
.sgnin:hover {
  background-color: #D3DCE6;
  color: black;
}
.dialog-footer {
  text-align: left !important;
}
</style>
