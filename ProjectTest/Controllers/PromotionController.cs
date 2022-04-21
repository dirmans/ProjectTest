using ExcelDataReader;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectTest.Data;
using ProjectTest.DTOs;
using ProjectTest.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ProjectTest.Controllers
{
    [Authorize]
    public class PromotionController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _env;

        public PromotionController(DataContext context, IWebHostEnvironment env)
        {
            this._context = context;
            this._env = env;
        }

        #region Transaction

        [HttpPost("upload-file")]
        public async Task<ActionResult> UploadFile([FromForm] FileUploadDto fileUploadDto)
        {
            var formCollection = await Request.ReadFormAsync();
            var file = formCollection.Files.First();

            var pathToSave = Path.Combine(_env.WebRootPath, "Resources");
            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fullPath = Path.Combine("Resources", fileName);

            await using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            List<StoreDto> store = new();

            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            using (var stream = System.IO.File.Open(fullPath, FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    while (reader.Read()) //Each row of the file
                    {
                        store.Add(new StoreDto
                        {
                            Store = reader.GetValue(0).ToString(),
                            StoreName = reader.GetValue(1).ToString()
                        });
                    }
                }
            }

            return Ok(store);
        }

        [HttpPost("save")]
        public async Task<ActionResult<PayloadDto>> SavePromotion(PromotionDto promotionDto)
        {
            // genarate format promoId
            var formatId = await Utility.Helpers.GetFormatPromoId(_context);
            var promotionData = new TrPromotion();
            var storeData = new List<TrStores>();

            promotionData.PromoId = formatId.ToString();
            promotionData.PromoType = promotionDto.PromoType;
            promotionData.ValueType = promotionDto.ValueType;
            promotionData.PromoStart = promotionDto.PromoStart.ToLocalTime();
            promotionData.PromoEnd = promotionDto.PromoEnd.ToLocalTime();
            promotionData.PromoDescription = promotionDto.PromoDescription;
            promotionData.Created = DateTime.Now;
            promotionData.CreatedBy = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            promotionData.Modified = DateTime.Now;
            promotionData.ModifiedBy = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            await _context.TrPromotion.AddAsync(promotionData);

            foreach (var item in promotionDto.StoreList)
            {
                storeData.Add(new TrStores
                {
                    PromoId = formatId,
                    Store = item.Store,
                    StoreName = item.StoreName
                });
            }

            await _context.TrStores.AddRangeAsync(storeData);

            await _context.SaveChangesAsync();

            // save to file txt
            await Utility.Helpers.SaveTxtFilePromotion(formatId, promotionData);
            await Utility.Helpers.SaveTxtFileStores("promo_"+formatId, storeData);

            return new PayloadDto
            {
                PromoId = formatId
            };
        }

        #endregion Transaction
    }
}