<template>
    <div>
        <div class="div">
            <p>{{this.$route.query.val}}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {
        // this.$route.query.val
        console.log(this.$route.query)
    },
    methods: {

    }
};
</script>

<style lang='scss'>
div{
    margin: 0;
    padding: 0;
}
.div{
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: white;
    background: #3190E8;
    p{
        text-align: center;
        font-size: 20px;
    }
}
</style>
