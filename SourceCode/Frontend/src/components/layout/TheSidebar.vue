<template>
    <aside
        class="sidebar flex-column"
        :style="styleSidebar"
        :class="{ sidebar__grow: isSidebarGrow }"
    >
        <!-- Sidebar Header -->
        <header class="sidebar__header px-15 pt-10 pb-4 center-y col-gap-16">
            <section class="wh-36 center pointer">
                <section class="sidebar__header__icon icon"></section>
            </section>

            <h1 class="sidebar__header__title">APC QLTS</h1>
        </header>

        <!-- Sidebar body -->
        <main
            class="sidebar__body flex-column px-11 pt-15"
            :class="{ sidebar__shrink: !isSidebarGrow }"
        >
            <router-link to="/fixed_asset" class="relative" active-class="active">
                <m-sidebarItem order="1">Tài sản</m-sidebarItem>
                <m-tooltip content="Tài sản" type="right" />
            </router-link>
            <router-link to="/fixed_asset_transfer" class="relative" active-class="active">
                <m-sidebarItem order="2">Điều chuyển tài sản</m-sidebarItem>
                <m-tooltip content="Điều chuyển tài sản" type="right" />
            </router-link>
            <router-link to="/department" class="relative" active-class="active">
                <m-sidebarItem order="5">Phòng ban</m-sidebarItem>
                <m-tooltip content="Phòng ban" type="right" />
            </router-link>
        </main>

        <!-- Sidebar Footer -->
        <footer class="sidebar__footer h-40 w-100 center-y">
            <section class="wrapper-icon relative" @click="toggleIconSidebar">
                <section class="icon sidebar__footer-icon"></section>
                <m-tooltip :content="isSidebarGrow ? 'Thu hẹp' : 'Bung rộng'" type="right" />
            </section>
        </footer>
    </aside>
</template>

<script>
export default {
    name: 'TheSidebar',
    data() {
        return {
            isSidebarGrow: false
        }
    },
    methods: {
        /**
         * Author: LB.Thành (11/07/2023)
         * @param
         * Bung rộng Sidebar
         *
         */
        toggleIconSidebar() {
            this.isSidebarGrow = !this.isSidebarGrow
        }
    },
    computed: {
        /**
         *  Author: LB.Thành (11/07/2023)
         *  Style của sidebar
         */
        styleSidebar() {
            return {
                width: this.isSidebarGrow ? '200px' : '66px',
                transition: 'width 0.3s ease-in-out'
            }
        }
    }
}
</script>
<style scoped>
.ths {
    background-color: var(--background-active-icon);
    border-radius: 4px;
}
</style>
