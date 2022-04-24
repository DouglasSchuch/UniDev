del dist\ChartsFunctions /Q /F
copy prod.env dist\.env /Y
copy buildpackage.json dist\package.json /Y
xcopy ChartsFunctions\*.* dist\ChartsFunctions\*.* /Y
copy node_modules\bcrypt\lib\binding\napi-v3\bcrypt_lib.node dist\bcrypt_lib.node /Y