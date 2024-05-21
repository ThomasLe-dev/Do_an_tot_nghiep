import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/tyu',
            component: () => import('/src/components/layout/TheMain.vue'),
            children: [
                {
                path: 'home',
                name: 'home',
                component: () => import('/src/views/home/ViewHome.vue')
                },
            {
                path: '/fixed_asset_transfer',
                name: 'fixed_asset_transfer',
                component: () => import('/src/views/fixed_asset_transfer/AssetTransferList.vue')
            },
            {
                path: '/fixed_asset',
                name: 'fixed_asset',
                component: () => import('/src/views/fixed_asset/FixedAssetTable.vue')
            },
            {
                path: '/report',
                name: 'report',
                component: () => import('/src/views/report/ViewReport.vue')
            },
            {
                path: '/tool',
                name: 'tool',
                component: () => import('/src/views/tool/ViewTool.vue')
            },
            {
                path: '/report',
                name: 'report',
                component: () => import('/src/views/report/ViewReport.vue')
            },
            {
                path: '/research',
                name: 'research',
                component: () => import('/src/views/research/ViewResearch.vue')
            },
            {
                path: '/category',
                name: 'category',
                component: () => import('/src/views/category/ViewCategory.vue')
            },
            {
                path: '/department',
                name: 'department',
                component: () => import('/src/views/department/ViewDepartment.vue')
            }],
            
        },
        {
            path: '/',
            component: () => import('/src/components/layout/LoginLayout.vue'),
            children: [
                {
                    path: '',
                    component: () => import('/src/views/home/ViewHome.vue')
                },
            ]
        }
    ]
})

export default router
