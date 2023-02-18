<template>
  <div class="pane-phone">
    <el-form
      :model="form"
      label-width="70px"
      status-icon
      :rules="phoneRules"
      :ref="RuleFormRef"
    >
      <el-form-item label="*手机号" prop="phone">
        <el-input
          v-model="form.phone"
          placeholder="请输入手机号"
          size="large"
          class="form"
        />
      </el-form-item>
      <el-form-item label="*验证码" prop="verification">
        <div class="verify-code">
          <!-- 发送验证码得有一个倒计时，还得和input在一行:用span标签包裹不行，只能用display布局 -->
          <el-input
            v-model="form.verification"
            placeholder="请输入验证码"
            size="large"
          />
          <el-button type="success">发送验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
const form = reactive({
  phone: '',
  verification: ''
})
const RuleFormRef = ref<InstanceType<typeof ElForm>>()
const phoneRules: FormRules = {
  phone: {
    required: true,
    message: '电话号码不能为空',
    trigger: 'blur'
    //还有pattern属性，
  },
  verification: {
    required: true,
    message: '验证码不能为空',
    trigger: 'blur'
  }
}
function loginAction(name) {
  console.log('loginAction', name)
  //验证登录
  RuleFormRef.value?.validate((valid) => {
    if (valid) {
      console.log('验证成功')
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
.pane-phone {
  // width: 100%;
  //怎么让el-input输入框的宽度是最长的
  //直接更改form上面的属性label-width：文字的宽度小一点
  //文字和inout输入框垂直不对齐
  margin-top: 20px;
  .verify-code {
    display: flex;
  }
}
</style>
