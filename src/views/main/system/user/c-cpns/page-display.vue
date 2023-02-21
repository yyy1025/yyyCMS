<template>
  <div class="page-display">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewData">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="userList" :border="true" style="width: 100%">
        <el-table-column align="center" type="selection" label="选择" />
        <el-table-column align="center" type="index" label="序号" width="80" />
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
          width="180"
        />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="180"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="手机号码"
          width="180"
        />
        <!-- 根据enable的值判断状态是启用还是禁用，这里是作用域插槽 -->
        <el-table-column align="center" prop="enable" label="状态" width="120">
          <template #default="scope">
            <el-button
              :type="scope.row.enable ? 'success' : 'danger'"
              plain
              size="small"
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <!-- <template #default="scope">
            {{ utcFormat(scope.row.createAt) }}
          </template> -->
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <!-- <template #default="scope">
            {{ utcFormat(scope.row.updateAt) }}
          </template> -->
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template #default="scope">
            <el-button type="primary" size="small" icon="EditPen" link>
              编辑
            </el-button>
            <el-button type="danger" size="small" icon="Delete" link>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userTotalCount"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import userStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'

//分页获取数据
const pageSize = ref(10)
const currentPage = ref(1)
function getUserList() {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  userStore().userListAction({ offset, size })
}
//展示数据
//pinia中的将store中的数据取出来
const { userList, userTotalCount } = storeToRefs(userStore())

getUserList()
// 新建用户
function handleNewData() {}
</script>

<style lang="less" scoped>
.page-display {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .handler {
      align-items: center;
    }
  }

  .table {
    :deep(.el-table__cell) {
      padding: 14px 0;
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
}
</style>
