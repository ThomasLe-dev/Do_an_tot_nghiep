<template>
    <header class="main__header h-44 center-y bg-white justify-between px-20 w-100">
        <!-- Tiêu đề -->
        <section class="main__header__left fw-700 center-y"></section>
        <section class="main__header__right center-y">
            <!-- Organization -->
            <section class="header__right__title">Công ty An Phát computer</section>

            <!-- Năm hiện tại -->
            <section class="header__right__year center-y br-4">
                <span class="year__title">Năm</span>
                <span class="year fw-700 center-y">{{ yearFollow }}</span>

                <section class="wrapper-icon flex-column row-gap-3">
                    <section class="choose-year-up icon" @click="increase"></section>
                    <section class="choose-year-down icon" @click="decrease"></section>
                </section>
            </section>

            <!--  -->
            <section class="header__right__icon center-y col-gap-20">
                <section class="wrapper-icon relative">
                    <section class="notification icon"></section>
                </section>
                <section class="wrapper-icon relative">
                    <section class="option icon"></section>
                </section>
                <section class="wrapper-icon relative">
                    <section class="help icon"></section>
                </section>
                <section class="avatar-section center-y col-gap-8">
                    <section class="wrapper-icon relative">
                        <section class="avatar icon"></section>
                        <m-tooltip @click="Logout()" content="Đăng Xuất" />
                    </section>
                    <section class="down icon"></section>
                </section>
            </section>
        </section>
    </header>
</template>

<script>
import { useYearOfTrack } from '/src/stores/yearOfTrack.js'
import { useIsLoading } from '/src/stores/isLoading.js'

export default {
    name: 'TheHeader',

    methods: {
        Logout() {
            this.setIsLoading(true)
            setTimeout(() => {
                this.setIsLoading(false)
                window.location.href = '/'
            }, 500)
        }
    },
    computed: {
        /**
         * Author: LB.Thành (11/07/2023)
         * Lấy dữ liệu từ trong store
         */
        yearOfTrackStore() {
            return useYearOfTrack()
        },
        /**
         * Lấy năm hiện tại
         */
        yearFollow() {
            return this.yearOfTrackStore.yearOfTrack
        },
        /**
         * Hàm tăng năm
         */
        increase() {
            return this.yearOfTrackStore.increase
        },
        /**
         * Hàm giảm năm
         */
        decrease() {
            return this.yearOfTrackStore.decrease
        },
        /**
         * @description Thay đổi trạng thái load dữ liệu
         * @author LB.Thành (27-07-2023)
         */
        setIsLoading() {
            return useIsLoading().setIsLoading
        }
    },
    updated() {
        console.log('Update Header')
    }
}
</script>
