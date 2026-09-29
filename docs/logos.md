# คู่มือไฟล์โลโก้

วางไฟล์โลโก้ไว้ใน `public/logos/` ตามโฟลเดอร์ด้านล่าง เว็บไซต์จะตรวจหาไฟล์ตอน build
ถ้ายังไม่มีไฟล์ หน้าเว็บจะแสดงข้อความแทน จึงเพิ่มไฟล์ภายหลังได้โดยไม่ต้องแก้โค้ด
(เพิ่มไฟล์แล้วต้อง build ใหม่)

## โฟลเดอร์และส่วนที่ใช้

| โฟลเดอร์ | ใช้ในส่วน | เนื้อหา |
|---|---|---|
| `public/logos/brand/` | แพลตฟอร์ม (#platforms), Header, Footer | โลโก้และสัญลักษณ์ 9Expert ทุกรูปแบบ |
| `public/logos/platforms/` | แพลตฟอร์ม (#platforms) | โลโก้แบรนด์ย่อยในเครือ 9Expert |
| `public/logos/clients/` | Hero (แถบโลโก้ลูกค้า), ผลงาน (#portfolio) | โลโก้ลูกค้าและองค์กร |
| `public/logos/government/` | Web Accessibility (#accessibility) | โลโก้หน่วยงานภาครัฐ |

> หมายเหตุ: ตอนนี้ส่วน #platforms เป็นส่วนเดียวที่อ่านไฟล์จาก `public/logos/`
> โลโก้ลูกค้า 6 ไฟล์ของแถบ Hero ยังอยู่ที่ `public/images/clients/` และโลโก้ 9Expert ใน Header/Footer
> ยังอยู่ที่ `public/images/` จะย้ายมาโฟลเดอร์นี้ในรอบถัดไป

## กติกาการตั้งชื่อและรูปแบบไฟล์

- ชื่อไฟล์เป็น **kebab-case** ภาษาอังกฤษตัวพิมพ์เล็ก คั่นคำด้วย `-` เช่น `bank-of-thailand.png`
  ห้ามมีช่องว่าง ภาษาไทย หรือตัวพิมพ์ใหญ่
- ใช้ไฟล์ **PNG พื้นหลังโปร่งใส**
- ขนาดอย่างน้อย **2 เท่าของขนาดที่แสดงบนจอ** เพื่อให้คมบนจอความละเอียดสูง
  - โลโก้แพลตฟอร์ม: กว้างอย่างน้อย 400px
  - โลโก้ลูกค้าและหน่วยงานรัฐ: ด้านยาวอย่างน้อย 400px
- ตัดขอบว่างรอบโลโก้ออกให้ชิดที่สุด

## โลโก้แพลตฟอร์ม (ส่วน #platforms)

ดาวเคราะห์ตรงกลางมีพื้นสีน้ำเงิน จึงต้องใช้ **โลโก้สีขาว** ตั้งชื่อตาม slug ของแต่ละแพลตฟอร์ม

| แพลตฟอร์ม | slug | ไฟล์สีขาว (ใช้บนดาวเคราะห์) | ไฟล์สีเต็ม |
|---|---|---|---|
| 9Expert Training | `training` | `platforms/training-white.png` | `platforms/training.png` |
| 9Expert Masterclass | `masterclass` | `platforms/masterclass-white.png` | `platforms/masterclass.png` |
| 9Expert Career Path | `career-path` | `platforms/career-path-white.png` | `platforms/career-path.png` |
| 9Expert Academy | `academy` | `platforms/academy-white.png` | `platforms/academy.png` |
| Thai Web Accessibility | `twa` | `platforms/twa-white.png` | `platforms/twa.png` |

- ถ้ายังไม่มีไฟล์ `<slug>-white.png` ดาวเคราะห์ตรงกลางจะแสดงชื่อย่อเป็นตัวอักษรแทน (เช่น "Training")
- ดาวเคราะห์ด้านข้างใช้สัญลักษณ์ 9Expert สีขาว: `brand/9expert-mark-white.png`
  ถ้ายังไม่มี จะแสดงตัวเลข "9" สีฟ้าแทน
- เพิ่มแพลตฟอร์มใหม่ (เช่น Exam) ได้ที่ `src/data/platforms.js` แล้ววางไฟล์ `<slug>-white.png` ตาม slug ที่ตั้ง
