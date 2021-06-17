
// segments的每个元素应该均含路径分隔符
exports.resolve = function resolve(...segments) {
    const basePath = "./";
    if (segments.length == 0) {
        return basePath;
    }
    
    // 从右到左拼接路径
    let segmentArray = Array.from(segments);
    let result = "";
    for (let i = segmentArray.length - 1; i >= 0; --i) {
        let path = segmentArray[i];
        if (path.length > 0)
        {
            result = path + result;
            if (result.charAt(0) == '/')
            {
                break;
            }
        }
    }
    
    // 若不是绝对路径则拼接到工作路径
    if (result.charAt(0) != '/') {
        result = basePath + result;
    }
    
    if (result != '/' && result.endsWith('/')) {
        result = result.substring(0, result.length - 2);
    }

    return result;
}