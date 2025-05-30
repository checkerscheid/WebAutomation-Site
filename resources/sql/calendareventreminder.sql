USE [WEBautomationCS]
GO
/****** Object:  Table [dbo].[calendareventreminder]    Script Date: 12.12.2018 14:53:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[calendareventreminder](
	[id_calendareventreminder] [int] IDENTITY(1,1) NOT NULL,
	[id_calendarevent] [varchar](250) NOT NULL,
	[minutes] [int] NOT NULL,
	[vreminder] [varchar](45) NULL,
	[sreminder] [int] NULL,
 CONSTRAINT [PK_calendareventreminder] PRIMARY KEY CLUSTERED 
(
	[id_calendareventreminder] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[calendareventreminder]  WITH CHECK ADD  CONSTRAINT [FK_calendareventreminder_calendarevent] FOREIGN KEY([id_calendarevent])
REFERENCES [dbo].[calendarevent] ([id_calendarevent])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[calendareventreminder] CHECK CONSTRAINT [FK_calendareventreminder_calendarevent]
GO
