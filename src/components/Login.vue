<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        class="input_form"
        :model="loginFrom"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="loginFrom.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            v-model="loginFrom.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btnitem">
          <el-button type="primary" @click="login()">登录</el-button>
          <el-button type="info" @click="resetLoginForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginFrom: {
        username: 'admin',
        password: '123456'
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 这是验证用户名
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 5, message: '请输入3-5个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6-12个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 这是表单重置
    resetLoginForm() {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      // this.$refs.loginFormRef.validate(function(valid,object){
      //     console.log(valid)
      //     console.log(object)
      // })
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginFrom)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        //1将登录成功的token 保存到客户端的sessionStorage 中
        // 1.1 项目中除了登录之外的其他Api接口 必须在登录之后才能访问
        // 1.2 token只应当在当前网站打开期间生效 所以将token保存在sessionStorage （会话机制） 中 不能localStorage （持久化）
        window.sessionStorage.setItem('token', res.data.token)
        //2 通过编程导航式跳转到后台主页 路由地址是 /home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btnitem {
  display: flex;
  justify-content: flex-end;
}
.input_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
