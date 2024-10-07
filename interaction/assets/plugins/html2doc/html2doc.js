if (typeof jQuery !== "undefined" && typeof saveAs !== "undefined") {
    (function($) {
        $.fn.wordExport = function(fileName) {
            fileName = typeof fileName !== 'undefined' ? fileName : "jQuery-Word-Export";
            let cssPageBackground = getComputedStyle(document.documentElement).getPropertyValue('--print-bg');

            let static = {
                mhtml: {
                    top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + `\n\n<!DOCTYPE html>\n<html  xmlns:v="urn:schemas-microsoft-com:vml"
                      xmlns:o="urn:schemas-microsoft-com:office:office"
                      xmlns:w="urn:schemas-microsoft-com:office:word"
                      xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
                      xmlns="http://www.w3.org/TR/REC-html40">\n_html_</html>`,
                    head: `<head>
                      <!--[if gte mso 9]><xml>
                       <w:WordDocument>
                        <w:DisplayBackgroundShape/>
                        <w:SpellingState>Clean</w:SpellingState>
                        <w:GrammarState>Clean</w:GrammarState>
                        <w:TrackMoves>false</w:TrackMoves>
                        <w:TrackFormatting/>
                        <w:ValidateAgainstSchemas/>
                        <w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid>
                        <w:IgnoreMixedContent>false</w:IgnoreMixedContent>
                        <w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText>
                        <w:DoNotPromoteQF/>
                        <w:LidThemeOther>RU</w:LidThemeOther>
                        <w:LidThemeAsian>X-NONE</w:LidThemeAsian>
                        <w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript>
                        <w:Compatibility>
                         <w:BreakWrappedTables/>
                         <w:SplitPgBreakAndParaMark/>
                        </w:Compatibility>
                        <m:mathPr>
                         <m:mathFont m:val="Cambria Math"/>
                         <m:brkBin m:val="before"/>
                         <m:brkBinSub m:val="&#45;-"/>
                         <m:smallFrac m:val="off"/>
                         <m:dispDef/>
                         <m:lMargin m:val="0"/>
                         <m:rMargin m:val="0"/>
                         <m:defJc m:val="centerGroup"/>
                         <m:wrapIndent m:val="1440"/>
                         <m:intLim m:val="subSup"/>
                         <m:naryLim m:val="undOvr"/>
                        </m:mathPr></w:WordDocument>
                      </xml><![endif]-->\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n`,
                    body: `<body bgcolor=${cssPageBackground}>_body_</body>`
                }
            };

            let options = {
                maxWidth: 624
            };
            // Clone selected element before manipulating it

            let markup = $(this).clone();
            let text = $('.b-frame__title').text();
            let qrcode = $('#QRCode').clone().html();

            let pageOrientation = $('[name="pageOrientation"]').val();
            let pageFormat = $('[name="pageFormat"]').val();
            let cssBackground = $('[data-css="backgroundColor"]').val();
            let cssColor = $('[data-css="color"]').val();
            let cssFontFamily = $('[data-css="fontFamily"]').val();



            let cssPageOrientation;
            let cssPageFormat;
            let cssTopMargin = '1cm';
            let cssPageMargin = '1cm 1cm 1cm 3cm';
            let cssSubtitleMargin = '2cm';
            let cssSubtitleMarginTop = '24pt';
            let cssTitleSize = '22pt';
            let cssSubtitleSize = '12pt';
            let cssLogoSize = '18pt';
            let cssLogoMarginTop = '100pt';
            let cssLogoMarginBottom = '36pt';
            let cssIconsBottom = '50pt';
            let scale = 1;
            let icWidth = '40';
            let cssTitleMrBm = '36pt';
            let cssQRSize = '2cm';

            function imgScaleWidth(el) {
                return $(el).width() * scale;
            }
            function imgScaleHeight(el) {
                return $(el).height() * scale;
            }

            switch(pageFormat) {
              case 'A3':
                if (pageOrientation === 'landscape') {
                  cssPageOrientation = 'landscape';
                  cssPageFormat = '42cm 29.7cm';
                  cssTopMargin = '4cm';
                  cssPageMargin = '1cm 2cm 1cm 5cm';
                  cssTitleSize = '36pt';
                  cssSubtitleSize = '18pt';
                  cssLogoSize = '28pt';
                } else {
                  cssPageOrientation = 'portrait';
                  cssPageFormat = '29.7cm 42cm';
                  cssTopMargin = '4cm';
                  cssPageMargin = '1cm 1cm 1cm 1cm';
                  cssSubtitleMargin = '4cm';
                  cssTitleSize = '36pt';
                  cssSubtitleSize = '18pt';
                  cssLogoSize = '28pt';
                }
                break;
              case 'A4':
                if (pageOrientation === 'landscape') {
                  cssPageOrientation = 'landscape';
                  cssPageFormat = '29.7cm 21cm';
                } else {
                  cssPageOrientation = 'portrait';
                  cssPageFormat = '21cm 29.7cm';
                  cssTopMargin = '0';
                  cssPageMargin = '1cm 1cm 1cm 1cm';
                  cssSubtitleMargin = '4cm';
                }
                break;
              case 'A5':
                if (pageOrientation === 'landscape') {
                  cssPageOrientation = 'landscape';
                  cssPageFormat = '21cm 14.8cm';
                  cssPageMargin = '1cm 1cm 1cm 1cm';
                  cssSubtitleMargin = '0.5cm';
                  cssTitleSize = '20pt';
                  cssLogoSize = '16pt';
                  cssLogoMarginTop = '10pt';
                  cssLogoMarginBottom = '18pt';
                  cssIconsBottom = '20pt';
                  cssTopMargin = '2cm';
                  scale = .7;
                } else {
                  cssPageOrientation = 'portrait';
                  cssPageFormat = '14.8cm 21cm';
                  cssTopMargin = '0';
                  cssPageMargin = '1cm 1cm 1cm 1cm';
                  cssSubtitleMargin = '1cm';
                  cssTitleSize = '20pt';
                  cssSubtitleSize = '12pt';
                  cssLogoSize = '16pt';
                  cssLogoMarginTop = '20pt';
                  cssLogoMarginBottom = '36pt';
                  cssIconsBottom = '20pt';
                  scale = .7;
                }
                break;
              case 'A6':
                if (pageOrientation === 'landscape') {
                  cssPageOrientation = 'landscape';
                  cssPageFormat = '14.8cm 10.5cm';
                  cssTopMargin = '1cm';
                  cssPageMargin = '1cm 1cm 1cm 1cm';
                  cssSubtitleMargin = '0';
                  cssSubtitleSize = '9pt';
                  cssLogoMarginTop = '0';
                  cssLogoMarginBottom = '12pt';
                  cssTitleSize = '14pt';
                  cssLogoSize = '11pt';
                  scale = .5;
                  icWidth = '20';
                  cssIconsBottom = '0';
                  cssTitleMrBm = '12pt';
                } else {
                  cssPageOrientation = 'portrait';
                  cssPageFormat = '10.5cm 14.8cm';
                  cssTopMargin = '0';
                  cssPageMargin = '1cm 1cm 1cm 1cm';
                  cssSubtitleMargin = '0';
                  cssSubtitleMarginTop = '6pt';
                  cssSubtitleSize = '9pt';
                  cssLogoMarginTop = '0';
                  cssLogoMarginBottom = '12pt';
                  cssTitleSize = '14pt';
                  cssLogoSize = '11pt';
                  scale = .5;
                  icWidth = '20';
                  cssIconsBottom = '20pt';
                  cssTitleMrBm = '12pt';
                }
                break;
            };

            let widthLogo = imgScaleWidth('.b-frame-logo__img');
            let heightLogo = imgScaleHeight('.b-frame-logo__img');

            let widthQR = imgScaleWidth('.b-frame__qr-img img');
            let heightQR = imgScaleHeight('.b-frame__qr-img img');
            let widthLogoDev = imgScaleWidth('.b-frame__logo-dev img');
            let heightLogoDev = imgScaleHeight('.b-frame__logo-dev img');

            let typeIc = $('.b-frame-icons').clone();

            typeIc.find('img').each(function() {
              $(this).attr('width', icWidth);
              $(this).attr('height', icWidth);
            })


            let markupDoc;
            if (pageOrientation === 'portrait') {
               markupDoc = `
                <div class="b-frame__body-wrap">
                  <div class="b-frame__body-inner">
                    <div class="b-frame__content">
                      <div class="b-frame__qr-top">
                        <table class="b-frame-logo">
                          <tr>
                            <td><img class="b-frame-logo__img" src="assets/img/content/b-templates/logo-company.png" alt="logo"/ width="${widthLogo}" height="${heightLogo}"></td>
                            <td><span class="b-frame-logo__name">Umbrella Corporation</span></td>
                          </tr>
                        </table>
                        <div class="b-frame__title">${text}</div>
                        <div class="b-frame-icons">${typeIc.html()}</div>
                      </div>
                      <div class="b-frame__qr-bottom">
                        <div class="b-frame__qr-img">
                          ${qrcode}
                        </div>
                        <div class="b-frame__title-wrap">
                          <div class="b-frame__subtitle">Відскануйте QR код смартфоном, перейдіть за посиланням та залиште свій коментар</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <table id='hrdftrtbl' border='0' cellspacing='0' cellpadding='0'>
                    <tr><td>
                        <div style='mso-element:footer' id=f1></div>
                        <div style='mso-element:footer' id=ff1>
                          <div class="b-frame__logo-dev">
                            <div class="MsoFooter"><img src="assets/img/general/logo-url.svg" alt="Оцінка якості" width="${widthLogoDev}" height="${heightLogoDev}"/></div>
                          </div>
                        </div>
                    </td></tr>
                  </table>
                </div>
            `} else {
               markupDoc = `
                <div class="b-frame__body-wrap">
                  <div class="b-frame__body-inner">
                    <table class="b-frame__content">
                      <tr>
                        <td class="b-frame__qr-top">
                          <table class="b-frame-logo">
                            <tr>
                              <td><img class="b-frame-logo__img" src="assets/img/content/b-templates/logo-company.png" alt="logo"  width="${widthLogo}" height="${heightLogo}"/></td>
                              <td><span class="b-frame-logo__name">Umbrella Corporation</span></td>
                            </tr>
                          </table>
                          <div class="b-frame__title">${text}</div>
                          <div class="b-frame-icons">${typeIc.html()}</div>
                        </td>
                        <td class="b-frame__qr-bottom">
                          ${qrcode}
                          <div class="b-frame__title-wrap">
                            <div class="b-frame__subtitle">Відскануйте QR код смартфоном, перейдіть за посиланням та залиште свій коментар</div>
                          </div>
                        </td>
                       </tr>
                    </table>

                    <table id='hrdftrtbl' border='0' cellspacing='0' cellpadding='0'>
                      <tr><td>
                          <div style='mso-element:footer' id=f1></div>
                          <div style='mso-element:footer' id=ff1>
                            <div class="b-frame__logo-dev">
                              <div class="MsoFooter"><img src="assets/img/general/logo-url.svg" alt="Оцінка якості" width="${widthLogoDev}" height="${heightLogoDev}"/></div>
                            </div>
                          </div>
                      </td></tr>
                    </table>
                  </div>
                </div>
            `}


            //TODO: load css from included stylesheet
            let styles = `
              @page SectionPage {
                  mso-page-orientation: ${cssPageOrientation};
                  size: ${cssPageFormat};
                  margin: ${cssPageMargin};
                  mso-paper-source:0;
                  mso-footer-margin:.5in;
                  mso-title-page:yes;
                  mso-footer: f1;
                  mso-first-footer: ff1;
                  font-family: ${cssFontFamily};
                  color: ${cssColor};
              }
              table#hrdftrtbl {
                  margin:0in 0in 0in 90000in;
                  width:1px;
                  height:1px;
                  overflow:hidden;
              }

              .b-frame__body-wrap {
                page: SectionPage;
              }
              .b-frame__body-inner {
                margin-top: ${cssTopMargin};
              }
              .b-frame-icons {
                margin-bottom: ${cssIconsBottom};
              }
              .b-frame__content {
                text-align: center;
                line-height: 140%;
              }

              .b-frame__title {
                padding-top: 36pt;
                margin-bottom: ${cssTitleMrBm};
                font-size: ${cssTitleSize};
                line-height: 1.4;
                font-family: ${cssFontFamily};
              }
              .b-frame__subtitle {
                margin-top: ${cssSubtitleMarginTop};
                margin-bottom: 6px;
                margin-left: ${cssSubtitleMargin};
                margin-right: ${cssSubtitleMargin};
                font-size: ${cssSubtitleSize};
                line-height: 1.4;
                font-family: ${cssFontFamily};
              }
              .b-frame__logo {
                width: 96px;
                margin-top: 12px;
              }
              .b-frame__qr-img {
                margin-bottom: 8px;
                text-align: center;
              }
              .b-frame-icons__item {
                margin-left: 0.1cm;
                margin-right: 0.1cm;
                margin-top: 1pt;
                margin-bottom: 1pt;
              }
              .b-frame-icons__item img
                width: auto;
                height: auto;
              }
              .b-frame__logo-dev {
                margin-top: 0;
                padding-bottom: 0;
                text-align: center;
                font-size: 0;
              }
              .b-frame__logo-dev img {
                width: 99px;
                height: auto;
              }
              .b-frame-logo {
                margin: ${cssLogoMarginTop} 20px ${cssLogoMarginBottom};
              }
              .b-frame-logo__name {
                margin-left: 12px;
                font-weight: 500;
                font-size: ${cssLogoSize};
                line-height: 140%;
                font-family: ${cssFontFamily};
                color: ${cssColor};
              }
            `;



            // Remove hidden elements from the output
            // markup.each(function() {
            //     var self = $(this);
            //     if (self.is(':hidden'))
            //         self.remove();
            // });

            // Embed all images using Data URLs
            let images = Array();
            let img = markup.find('img');
            for (let i = 0; i < img.length; i++) {
                // Calculate dimensions of output image
                var w = Math.min(img[i].width, options.maxWidth);
                var h = img[i].height * (w / img[i].width);
                // Create canvas for converting image to data URL
                var canvas = document.createElement("CANVAS");
                canvas.width = w;
                canvas.height = h;
                // Draw image to canvas
                var context = canvas.getContext('2d');
                context.drawImage(img[i], 0, 0, w, h);
                // Get data URL encoding of image
                var uri = canvas.toDataURL("image/png");
                $(img[i]).attr("src", img[i].src);
                img[i].width = w;
                img[i].height = h;
                // Save encoded image to array
                images[i] = {
                    type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
                    encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
                    location: $(img[i]).attr("src"),
                    data: uri.substring(uri.indexOf(",") + 1)
                };
            }

            // Prepare bottom of mhtml file with image data
            let mhtmlBottom = "\n";
            for (let i = 0; i < images.length; i++) {
                mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
                mhtmlBottom += "Content-Location: " + images[i].location + "\n";
                mhtmlBottom += "Content-Type: " + images[i].type + "\n";
                mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
                mhtmlBottom += images[i].data + "\n\n";
            }
            mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";


            // Aggregate parts of the file together
            let fileContent = static.mhtml.top.replace("_html_", static.mhtml.head.replace("_styles_", styles) + static.mhtml.body.replace("_body_", markupDoc)) + mhtmlBottom;

            // Create a Blob with the file contents
            let blob = new Blob([fileContent], {
                type: "application/msword;charset=utf-8"
            });
            saveAs(blob, fileName + ".doc");
        };
    })(jQuery);
} else {
    if (typeof jQuery === "undefined") {
        console.error("jQuery Word Export: missing dependency (jQuery)");
    }
    if (typeof saveAs === "undefined") {
        console.error("jQuery Word Export: missing dependency (FileSaver.js)");
    }
}
