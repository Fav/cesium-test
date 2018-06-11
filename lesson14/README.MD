# 移动 primitive

1. 这里尝试使用修改 modelmatrix 和 geometry之后再 使用scene.primitives.update()刷新，但是无效

2. 目前解决方案，先removeAll()(remove的时候会调用destroy，导致之前的item销毁)，再在新位置创建primitive，添加到scene中
