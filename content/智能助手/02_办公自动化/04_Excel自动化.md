---
title: Excel 自动化
tags:
  - AIGC
  - Excel
  - 办公自动化
  - 敏感数据
---

# Excel 自动化

## 场景介绍

在日常工作中，我们经常需要处理各种 Excel 表格：

- 批量生成标准化报表
- 汇总多个部门的数据
- 清洗和整理数据
- 根据模板生成个性化文档

本教程将演示一个完整的工作流：**提供 Excel 模板 → 让智能助手编写脚本 → 本地运行处理**。

## 准备工作

### 工具准备

1. **Python 环境**：确保已安装 Python 3.8+
2. **Excel 库**：安装 pandas 和 openpyxl
   ```bash
   pip install pandas openpyxl
   ```
3. **Excel 模板**：准备一个 Excel 模板文件

### 场景说明

假设我们是 HR 部门，需要每月处理员工考勤数据并生成工资条：

**输入：**
- `考勤数据.xlsx` - 包含员工考勤记录
- `工资模板.xlsx` - 工资条模板

**输出：**
- 每个员工一份工资条 Excel 文件

## 步骤一：准备 Excel 模板

创建一个工资条模板 `工资模板.xlsx`：

```
┌─────────────────────────────────────────┐
│              工资条                     │
├──────────┬──────────────────────────────┤
│ 项目     │ 金额                         │
├──────────┼──────────────────────────────┤
│ 姓名     │ {{姓名}}                     │
│ 工号     │ {{工号}}                     │
│ 部门     │ {{部门}}                     │
│ 基本工资 │ {{基本工资}}                  │
│ 绩效奖金 │ {{绩效奖金}}                  │
│ 考勤扣款 │ {{考勤扣款}}                  │
│ 应发工资 │ {{应发工资}}                  │
│ 实发工资 │ {{实发工资}}                  │
└──────────┴──────────────────────────────┘
```

## 步骤二：准备考勤数据

创建 `考勤数据.xlsx`，包含以下列：

| 姓名 | 工号 | 部门 | 基本工资 | 绩效奖金 | 迟到次数 | 早退次数 | 请假天数 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 张三 | 001 | 技术部 | 10000 | 3000 | 2 | 1 | 1 |
| 李四 | 002 | 市场部 | 8000 | 2000 | 0 | 0 | 0 |
| 王五 | 003 | 人事部 | 9000 | 2500 | 1 | 0 | 2 |
| 赵六 | 004 | 财务部 | 8500 | 2200 | 3 | 2 | 0 |

## 步骤三：向智能助手描述需求

这是最关键的一步，需要清晰地描述你的需求：

```
我需要你帮我写一个 Python 脚本，用于批量生成员工工资条。

【输入文件】
1. 考勤数据.xlsx - 包含员工考勤信息，列如下：
   - 姓名、工号、部门、基本工资、绩效奖金、迟到次数、早退次数、请假天数

2. 工资模板.xlsx - 工资条模板，使用 {{字段名}} 作为占位符

【计算规则】
1. 考勤扣款计算：
   - 迟到一次扣 50 元
   - 早退一次扣 50 元
   - 请假一天扣 200 元
   - 考勤扣款 = 迟到次数 × 50 + 早退次数 × 50 + 请假天数 × 200

2. 应发工资 = 基本工资 + 绩效奖金

3. 实发工资 = 应发工资 - 考勤扣款

【输出要求】
1. 为每个员工生成一个独立的 Excel 文件
2. 文件名格式：工资条_姓名_工号.xlsx
3. 将文件保存到"工资条"文件夹中
4. 保持模板的格式和样式不变

【技术要求】
1. 使用 pandas 和 openpyxl 库
2. 脚本需要有注释说明
3. 处理过程中需要打印进度信息
4. 如果文件夹不存在，自动创建

请帮我写完整的脚本代码，并告诉我如何运行。
```

## 步骤四：获取智能助手生成的脚本

智能助手会生成类似下面的脚本：

```python
import pandas as pd
import openpyxl
import os
from openpyxl import load_workbook

def calculate_salary(row):
    late_deduction = row['迟到次数'] * 50
    early_deduction = row['早退次数'] * 50
    leave_deduction = row['请假天数'] * 200
    
    attendance_deduction = late_deduction + early_deduction + leave_deduction
    gross_salary = row['基本工资'] + row['绩效奖金']
    net_salary = gross_salary - attendance_deduction
    
    return {
        '考勤扣款': attendance_deduction,
        '应发工资': gross_salary,
        '实发工资': net_salary
    }

def generate_payslip(template_path, data_row, output_path):
    wb = load_workbook(template_path)
    ws = wb.active
    
    salary_data = calculate_salary(data_row)
    
    for row in ws.iter_rows(min_row=1, max_row=ws.max_row):
        for cell in row:
            if cell.value and isinstance(cell.value, str) and '{{' in cell.value:
                field_name = cell.value.replace('{{', '').replace('}}', '')
                
                if field_name in data_row:
                    cell.value = data_row[field_name]
                elif field_name in salary_data:
                    cell.value = salary_data[field_name]
    
    wb.save(output_path)
    print(f"✓ 已生成工资条: {output_path}")

def main():
    print("=" * 50)
    print("          工资条批量生成工具")
    print("=" * 50)
    
    input_file = '考勤数据.xlsx'
    template_file = '工资模板.xlsx'
    output_folder = '工资条'
    
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        print(f"📁 创建输出文件夹: {output_folder}")
    
    if not os.path.exists(input_file):
        print(f"❌ 错误：找不到文件 {input_file}")
        return
    
    if not os.path.exists(template_file):
        print(f"❌ 错误：找不到文件 {template_file}")
        return
    
    print(f"📊 正在读取考勤数据...")
    df = pd.read_excel(input_file)
    print(f"📊 共读取 {len(df)} 条员工记录")
    
    print("\n🚀 开始生成工资条...")
    for index, row in df.iterrows():
        employee_name = row['姓名']
        employee_id = row['工号']
        output_file = os.path.join(output_folder, f'工资条_{employee_name}_{employee_id}.xlsx')
        
        generate_payslip(template_file, row, output_file)
    
    print("\n🎉 工资条生成完成！")
    print(f"📦 共生成 {len(df)} 个工资条文件")
    print(f"📂 文件保存在: {os.path.abspath(output_folder)}")

if __name__ == '__main__':
    main()
```

## 步骤五：在本地运行脚本

### 创建文件结构

```
工资条生成/
├── 考勤数据.xlsx
├── 工资模板.xlsx
└── generate_payslip.py
```

### 安装依赖

```bash
pip install pandas openpyxl
```

### 运行脚本

```bash
python generate_payslip.py
```

## 步骤六：验证结果

打开生成的工资条文件，验证内容是否正确：

```
┌─────────────────────────────────────────┐
│              工资条                     │
├──────────┬──────────────────────────────┤
│ 项目     │ 金额                         │
├──────────┼──────────────────────────────┤
│ 姓名     │ 张三                         │
│ 工号     │ 001                         │
│ 部门     │ 技术部                       │
│ 基本工资 │ 10000                        │
│ 绩效奖金 │ 3000                         │
│ 考勤扣款 │ 350                          │
│ 应发工资 │ 13000                        │
│ 实发工资 │ 12650                        │
└──────────┴──────────────────────────────┘
```

## 敏感数据处理最佳实践

在处理工资条、客户信息、财务数据等敏感数据时，需要特别注意数据安全。以下是最佳实践：

### 实践 1：使用模板和测试数据

不要直接向智能助手提供真实数据，而是使用模板和测试数据：

```
步骤：
1. 准备模板文件（不含真实数据，使用占位符）
2. 创建测试数据文件（使用虚构数据）
3. 向智能助手描述需求（只提供模板和测试数据）
4. 获取生成的脚本
5. 使用测试数据验证脚本
6. 修改配置，使用真实数据运行（完全在本地）
```

### 实践 2：使用配置文件管理路径

```python
CONFIG = {
    'input_file': '测试数据.xlsx',  # 开发测试时使用
    # 'input_file': '真实数据.xlsx',  # 正式运行时切换
    'template_file': '工资条模板.xlsx',
    'output_folder': '工资条'
}
```

### 实践 3：数据脱敏处理

```python
def mask_sensitive_data(data):
    masked_data = data.copy()
    
    if '姓名' in masked_data.columns:
        masked_data['姓名'] = masked_data['姓名'].apply(lambda x: x[0] + '*' * (len(x) - 1))
    
    if '工号' in masked_data.columns:
        masked_data['工号'] = masked_data['工号'].apply(lambda x: '*' * (len(x) - 2) + x[-2:])
    
    return masked_data
```

### 实践 4：本地运行，离线处理

```python
def check_internet():
    try:
        import urllib.request
        urllib.request.urlopen('http://www.baidu.com', timeout=1)
        return True
    except:
        return False

def main():
    if check_internet():
        print("⚠️ 警告：当前网络已连接。建议在离线环境下处理敏感数据。")
```

## 扩展应用

### 扩展 1：批量合并 Excel 文件

**提示词：**
```
请帮我写一个 Python 脚本，批量合并多个 Excel 文件。

【输入】
- 文件夹"销售数据"中包含多个 Excel 文件
- 每个文件结构相同：日期、地区、产品、金额、数量

【输出】
- 一个合并后的 Excel 文件"销售汇总.xlsx"
- 包含所有文件的数据
- 添加一列"来源文件"记录数据来源
```

### 扩展 2：数据清洗脚本

**提示词：**
```
请帮我写一个 Python 脚本，用于清洗 Excel 数据。

【输入】
- data.xlsx 文件

【清洗规则】
1. 删除所有空行
2. 删除重复行（根据"工号"列判断）
3. 将"金额"列转换为数值格式，非数值填充为 0
4. 将"日期"列统一格式为 YYYY-MM-DD
```

---

**相关资源：**

- [pandas 官方文档](https://pandas.pydata.org/docs/)
- [openpyxl 官方文档](https://openpyxl.readthedocs.io/)
- [Bilibili Python Excel 自动化教程](https://www.bilibili.com/search?keyword=Python%20Excel%20自动化)
