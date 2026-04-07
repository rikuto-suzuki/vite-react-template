import { createRoot } from "react-dom/client";

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
              font-size: 0.65rem;
              width: 100%;
              border-collapse: collapse;
            }

            .table th,
            .table td {
              border: 1px solid #ccc;
              padding: 2mm;
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
              }

              /* ページサイズ指定 */
              @page {
                size: A4;
                margin: 10mm;
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
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    `;

    const rootElement = printWindow.document.getElementById("root");
    if (!rootElement) return;
    const root = createRoot(rootElement!);
    root.render(component);

    const doPrint = () => {
      printWindow.focus();
      printWindow.print();
      // レンダリング結果を残すため、閉じないようにする（ユーザーが手動で閉じる）
    };

    const schedulePrint = () => {
      // レイアウト/ペイント完了を待つために requestAnimationFrame を利用
      if (typeof printWindow.requestAnimationFrame === "function") {
        printWindow.requestAnimationFrame(() => {
          // 余裕を持ってもう 1 フレーム待つ
          printWindow.requestAnimationFrame(doPrint);
        });
      } else {
        // requestAnimationFrame が利用できない場合は、500ms 待機してから印刷
        setTimeout(doPrint, 500);
      }
    };

    schedulePrint();
  };

  return { print };
}
