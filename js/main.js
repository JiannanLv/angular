//模拟数据
/*
var datas = [
    { firstName:"王",lastName:"昭君" },
    { firstName:"西",lastName:"施" },
    { firstName:"貂",lastName:"蝉" },
    { firstName:"杨",lastName:"玉环" }
];
*/

//设置一个app module
var app = angular.module("myApp",[]);

//创建controller
app.controller("myCtrl",function($scope,$http){
    //引用模拟数据
    $scope.users = [];

    $http.get("http://localhost:8000/user?act=get").success(function(req){
        $scope.users = req;
        console.log(req);
    });

    //设置disabled,默认值为true
    $scope.disa = true;

    //设置全局editid
    var editid = '';

    //设置编辑的布尔值
    $scope.editBool = true;

    //设置默认方法
    function setReset(){
        $scope.disa = true;
        $scope.editBool = true;
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.pass1 = '';
        $scope.pass2 = '';
        editid = '';
    }
    setReset();

    //编辑方法
    $scope.editFun = function(id,f,l){
        //给Index 赋值
        editid = id;

        //重置editBool
        $scope.editBool = false;
        $scope.disa = false;

        //把数据放到编辑区域
        $scope.firstName = f;
        $scope.lastName = l;


    };

    //创建用户
    $scope.createUser = function(){
        //重置editBool
        $scope.editBool = true;
        setReset();
    };

    //总体监听保存事件
    $scope.changeFun = function(){
        //创建
        if($scope.editBool){

            $scope.disa = $scope.firstName!=''&&$scope.lastName!=''&&$scope.pass1!=''&&$scope.pass2!=''&&$scope.pass1==$scope.pass2?false:true;

        }else{ //编辑
            $scope.disa = $scope.firstName!=''&&$scope.lastName!=''?false:true;
        }
    };


    //设置保存方法
    $scope.saveFun = function(){
        //创建
        if($scope.editBool){

            var datas = {
                firstName:$scope.firstName,
                lastName:$scope.lastName
            };

            $http.get("http://localhost:8000/user?act=add",{params:datas}).success(function(req){
                $scope.users = req;
            });

        }else{ //编辑

            //保存编辑的数据
            var dataBox = {
                id:editid,
                firstName:$scope.firstName,
                lastName:$scope.lastName
            };

            $http.get("http://localhost:8000/user?act=edit",{params:dataBox}).success(function(req){
                $scope.users = req;
            });

        }

        //重置
        setReset();
    };

    //删除
    $scope.delUser = function(del){
        var indexBox = {
            id:del
        };
        $http.get("http://localhost:8000/user?act=remove",{params:indexBox}).success(function(req){
            $scope.users = req;
        });

        //重置
        setReset();

    };


});