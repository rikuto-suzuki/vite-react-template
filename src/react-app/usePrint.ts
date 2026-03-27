import { createRoot } from "react-dom/client";

// TODO Reactのプリレンダーを利用して、印刷用のHTMLを生成する方法も検討する
export function usePrint() {
  const print = (component: React.ReactNode) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      return;
    }
    const timestamp = new Date().toISOString();

    printWindow.document.documentElement.innerHTML = `
      <html>
        <head>
          <title>${timestamp}</title>
          <style>
            body {
              font-family: sans-serif;
              margin: 0;
              background: #f5f5f5;
            }

            header {
              background: #333;
              color: white;
              padding: 16px;
            }

            .document {
              margin: 24px auto;
              background: white;
              padding: 24px;
            }

            .table {
              font-size: 0.85rem;
              width: 100%;
              border-collapse: collapse;
            }

            .table th,
            .table td {
              border: 1px solid #ccc;
              padding: 8px;
            }

            @media print {
              /* 背景や余白リセット */
              body {
                background: white;
                margin: 0;
              }

              .document {
                margin: 0;
                padding: 0;
                width: 100%;
              }

              /* 不要要素を非表示 */
              .no-print {
                display: none !important;
                display: hidden;
              }

              /* ページサイズ指定 */
              @page {
                size: A4 landscape;
                margin: 20mm;
              }

              /* ページ単位の制御 */
              .page {
                page-break-inside: avoid;
              }

              /* 明示的改ページ */
              .page-break {
                page-break-before: always;
                break-before: page;
              }

              /* テーブルの改ページ制御 */
              table {
                page-break-inside: auto;
              }

              tr {
                page-break-inside: avoid;
                page-break-after: auto;
              }

              thead {
                display: table-header-group;
              }

              tfoot {
                display: table-footer-group;
              }

              /* フォントサイズ調整（印刷向け） */
              body {
                font-size: 12pt;
              }
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    `;

    const rootElement = printWindow.document.getElementById("root");
    const root = createRoot(rootElement!);
    root.render(component);

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return { print };
}
