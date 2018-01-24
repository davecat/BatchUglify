var UglifyJS = require('uglify-js');
//公共引用
var fs = require('fs');
var path = require('path');//解析需要遍历的文件夹
var filePath = path.resolve('./static/js');//输入文件夹
//输出文件夹
fs.mkdir(__dirname + '/disk/', function (err, files) {
    if(err) {
        console.warn(err);
        return;
    }
});
//调用文件遍历方法
fileDisplay(filePath);
//文件遍历方法
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror, stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            // 读取文件内容
                            var code = fs.readFileSync(filedir, 'utf-8');
                            //丑化
                            var result = UglifyJS.minify(code);
                            // console.log(result.error); // 抛出错误
                            // console.log(result.code);  // 丑化后代码
                            fs.writeFile(__dirname+ '/disk/'+filename,result.code, function () {
                                if(err) throw err;
                                console.log('成功');
                            })
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}



