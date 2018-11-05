<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    };
</script>

<style>
    #app, body {
        background-color: #f4f4f4;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        color:#2c3e50;
    }

    body, html, div, blockquote, img, label, p, h1, h2, h3, h4, h5, h6, pre, ul, ol,
    li, dl, dt, dd, form, a, fieldset, input, th, td {
        margin: 0;
        padding: 0;
        border: 0;
        outline: none;
    }

    ul, ol {
        list-style: none;
    }

    a {
        color: black;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    html {
        font-family: "Microsoft YaHei", Arial;

    }

    .clearfix:after {
        content: "\0020";
        display: block;
        height: 0;
        clear: both;
    }

    .clearfix {
        zoom: 1;
    }

    .flex-column {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .flex-column-start {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    .flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .flex-between {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .flex-start {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
    }

    .flex-end {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
    }

    .flex-around {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
    }
    .flex-wrap{
        display: flex;
        flex-wrap: wrap;
        /*align-items: center;*/
        justify-content: center;
        /*width: 100%;*/
    }
    .mint-tab-item-label{
        font-size: 14px;
    }

    .red {
        color: #ef4f4f;
    }
    .red2 {
        color: #9d3731;
    }
    .red3{
        color: #f73c3c;
    }

    .f12 {
        font-size: 12px;
    }

    .f13 {
        font-size: 13px;
    }

    .f14 {
        font-size: 14px;
    }

    .f15 {
        font-size: 15px;
    }

    .f16 {
        font-size: 16px;
    }

    .f17 {
        font-size: 17px;
    }

    .f18 {
        font-size: 18px;
    }

    .f19 {
        font-size: 19px;
    }

    .f20 {
        font-size: 20px;
    }

    .f22 {
        font-size: 22px;
    }
</style>
