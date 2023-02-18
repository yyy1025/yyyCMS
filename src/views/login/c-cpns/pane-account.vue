<template>
  <div class="pane-accout">
    <!-- ref="RuleFormRef" 是干啥的?绑定ref属性是为了拿到el-form-->
    <el-form
      :model="form"
      label-width="70px"
      status-icon
      :rules="accountRules"
      ref="RuleFormRef"
    >
      <el-form-item label="*账号" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入账号"
          size="large"
          label-width="100px"
        />
      </el-form-item>
      <el-form-item label="*密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
          size="large"
          show-password
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormRules, ElForm, FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import accountLoginRequest from '@/service/login'
import loginStore from '@/store/login/login'
const useLoginStore = loginStore()
const form = reactive({
  name: '',
  password: ''
})
//本质上拿到的ELForm的实例
const RuleFormRef = ref<InstanceType<typeof ElForm>>()
const formRef = ref<FormInstance>()
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入用户名~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '密码必须在3位以上', trigger: 'blur' }
  ]
}
function loginAction(name) {
  console.log('loginAction', name)
  //验证登录
  RuleFormRef.value?.validate((valid) => {
    if (valid) {
      //第一步校验成功之后才可以进行登录操作
      const name = form.name
      const password = form.password
      const data = { name, password }
      //向相关接口请求数据，接口操作不写在业务逻辑里
      console.log('验证成功，可以发送请求了')
      // accountLoginRequest(data)
      //利用store中地actions中的方法发送请求
      useLoginStore.accountLoginAction({ name, password })
    } else {
      console.log('验证失败')
      //提示错误消息
      ElMessage.error('Oops, this is a error message.')
    }
  })
}
//暴露数据给父组件
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pane-accout {
  margin-top: 20px;
}
</style>
