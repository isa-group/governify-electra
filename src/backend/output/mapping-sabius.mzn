%% -------- BEGIN CONSTANTS DEFINITION --------
string: size = "researchers";
string: selectedPlan = "subscriber";
float: researchers = 1512;
float: pageSize = 200;
float: numPublications = 37;
float: numPublicationsTypeJournal = 24;
float: numPublicationsTypeConference = 13;
%% -------- END CONSTANTS DEFINITION --------


%% -------- BEGIN SERVICES DEFINITION --------

%% -------- BEGIN getAuthor DEFINITION --------
	%name: sabius-publication-data
	%operationId: getAuthor
	%path: /v1/{snapshot}/authors
	%method: GET

%Mapping
float: mapping_START_getAuthor = 1;
%% -------- BEGIN DEPENDENCY AuthorSearch OF getAuthor DEFINITION --------
	%name: scopus
	%operationId: AuthorSearch
	%path: /search/author
	%method: GET

%Mapping
float: mapping_getAuthor_AuthorSearch = 1;
	%BEGIN LIMITS FOR: AuthorSearch
		%Plan: non-subscriber
		float: quota_nonsubscriber_AuthorSearch_value = 5000;
		float: quota_nonsubscriber_getAuthor_AuthorSearch_value = 5000;
		float: quota_nonsubscriber_getAuthor_AuthorSearch_period_val = 1;
		string: quota_nonsubscriber_getAuthor_AuthorSearch_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_nonsubscriber_getAuthor_AuthorSearch_value = mapping_getAuthor_AuthorSearch/quota_nonsubscriber_getAuthor_AuthorSearch_value;
			float: unitQuotaConsumption_nonsubscriber_getAuthor_AuthorSearch_period_val = 1;
			string: unitQuotaConsumption_nonsubscriber_getAuthor_AuthorSearch_period_period = "weekly";

		float: rate_nonsubscriber_getAuthor_AuthorSearch_value = 3;
		float: rate_nonsubscriber_getAuthor_AuthorSearch_period_val = 1;
		string: rate_nonsubscriber_getAuthor_AuthorSearch_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_nonsubscriber_getAuthor_AuthorSearch_value = mapping_getAuthor_AuthorSearch/rate_nonsubscriber_getAuthor_AuthorSearch_value;
			float: unitRateConsumption_nonsubscriber_getAuthor_AuthorSearch_period_val = 1;
			string: unitRateConsumption_nonsubscriber_getAuthor_AuthorSearch_period_period = "secondly";
		%Plan: subscriber
		float: quota_subscriber_AuthorSearch_value = 5000;
		float: quota_subscriber_getAuthor_AuthorSearch_value = 5000;
		float: quota_subscriber_getAuthor_AuthorSearch_period_val = 1;
		string: quota_subscriber_getAuthor_AuthorSearch_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_subscriber_getAuthor_AuthorSearch_value = mapping_getAuthor_AuthorSearch/quota_subscriber_getAuthor_AuthorSearch_value;
			float: unitQuotaConsumption_subscriber_getAuthor_AuthorSearch_period_val = 1;
			string: unitQuotaConsumption_subscriber_getAuthor_AuthorSearch_period_period = "weekly";

		float: rate_subscriber_getAuthor_AuthorSearch_value = 3;
		float: rate_subscriber_getAuthor_AuthorSearch_period_val = 1;
		string: rate_subscriber_getAuthor_AuthorSearch_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_subscriber_getAuthor_AuthorSearch_value = mapping_getAuthor_AuthorSearch/rate_subscriber_getAuthor_AuthorSearch_value;
			float: unitRateConsumption_subscriber_getAuthor_AuthorSearch_period_val = 1;
			string: unitRateConsumption_subscriber_getAuthor_AuthorSearch_period_period = "secondly";
	%END LIMITS FOR: AuthorSearch

%% -------- BEGIN DEPENDENCY AuthorRetrievalid OF getAuthor DEFINITION --------
	%name: scopus
	%operationId: AuthorRetrievalid
	%path: /author/author_id/{author_id}
	%method: GET

%Mapping
float: mapping_getAuthor_AuthorRetrievalid = 1;
	%BEGIN LIMITS FOR: AuthorRetrievalid
		%Plan: non-subscriber
		float: quota_nonsubscriber_AuthorRetrievalid_value = 5000;
		float: quota_nonsubscriber_getAuthor_AuthorRetrievalid_value = 5000;
		float: quota_nonsubscriber_getAuthor_AuthorRetrievalid_period_val = 1;
		string: quota_nonsubscriber_getAuthor_AuthorRetrievalid_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_nonsubscriber_getAuthor_AuthorRetrievalid_value = mapping_getAuthor_AuthorRetrievalid/quota_nonsubscriber_getAuthor_AuthorRetrievalid_value;
			float: unitQuotaConsumption_nonsubscriber_getAuthor_AuthorRetrievalid_period_val = 1;
			string: unitQuotaConsumption_nonsubscriber_getAuthor_AuthorRetrievalid_period_period = "weekly";

		float: rate_nonsubscriber_getAuthor_AuthorRetrievalid_value = 3;
		float: rate_nonsubscriber_getAuthor_AuthorRetrievalid_period_val = 1;
		string: rate_nonsubscriber_getAuthor_AuthorRetrievalid_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_nonsubscriber_getAuthor_AuthorRetrievalid_value = mapping_getAuthor_AuthorRetrievalid/rate_nonsubscriber_getAuthor_AuthorRetrievalid_value;
			float: unitRateConsumption_nonsubscriber_getAuthor_AuthorRetrievalid_period_val = 1;
			string: unitRateConsumption_nonsubscriber_getAuthor_AuthorRetrievalid_period_period = "secondly";
		%Plan: subscriber
		float: quota_subscriber_AuthorRetrievalid_value = 5000;
		float: quota_subscriber_getAuthor_AuthorRetrievalid_value = 5000;
		float: quota_subscriber_getAuthor_AuthorRetrievalid_period_val = 1;
		string: quota_subscriber_getAuthor_AuthorRetrievalid_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_subscriber_getAuthor_AuthorRetrievalid_value = mapping_getAuthor_AuthorRetrievalid/quota_subscriber_getAuthor_AuthorRetrievalid_value;
			float: unitQuotaConsumption_subscriber_getAuthor_AuthorRetrievalid_period_val = 1;
			string: unitQuotaConsumption_subscriber_getAuthor_AuthorRetrievalid_period_period = "weekly";

		float: rate_subscriber_getAuthor_AuthorRetrievalid_value = 3;
		float: rate_subscriber_getAuthor_AuthorRetrievalid_period_val = 1;
		string: rate_subscriber_getAuthor_AuthorRetrievalid_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_subscriber_getAuthor_AuthorRetrievalid_value = mapping_getAuthor_AuthorRetrievalid/rate_subscriber_getAuthor_AuthorRetrievalid_value;
			float: unitRateConsumption_subscriber_getAuthor_AuthorRetrievalid_period_val = 1;
			string: unitRateConsumption_subscriber_getAuthor_AuthorRetrievalid_period_period = "secondly";
	%END LIMITS FOR: AuthorRetrievalid

%% -------- BEGIN INNER COMPOSITION DEFINITION --------
float: prob_getAuthor_AuthorSearch = 1;
float: prob_getAuthor_AuthorRetrievalid = 1;

array[int] of float: compositionReq_getAuthor = [prob_getAuthor_AuthorSearch * mapping_getAuthor_AuthorSearch , prob_getAuthor_AuthorRetrievalid * mapping_getAuthor_AuthorRetrievalid];

float: compositionReq_getAuthor_calculated = sum(compositionReq_getAuthor);

array[int] of float: compositionQuota_nonsubscriber_getAuthor_value = [prob_getAuthor_AuthorSearch * unitQuotaConsumption_nonsubscriber_getAuthor_AuthorSearch_value , prob_getAuthor_AuthorRetrievalid * unitQuotaConsumption_nonsubscriber_getAuthor_AuthorRetrievalid_value];

array[int] of float: compositionRate_nonsubscriber_getAuthor_value = [prob_getAuthor_AuthorSearch * unitRateConsumption_nonsubscriber_getAuthor_AuthorSearch_value , prob_getAuthor_AuthorRetrievalid * unitRateConsumption_nonsubscriber_getAuthor_AuthorRetrievalid_value];

float: compositionQuota_nonsubscriber_getAuthor_value_calculated = max(compositionQuota_nonsubscriber_getAuthor_value);

float: compositionRate_nonsubscriber_getAuthor_value_calculated = max(compositionRate_nonsubscriber_getAuthor_value);

array[int] of float: compositionQuota_subscriber_getAuthor_value = [prob_getAuthor_AuthorSearch * unitQuotaConsumption_subscriber_getAuthor_AuthorSearch_value , prob_getAuthor_AuthorRetrievalid * unitQuotaConsumption_subscriber_getAuthor_AuthorRetrievalid_value];

array[int] of float: compositionRate_subscriber_getAuthor_value = [prob_getAuthor_AuthorSearch * unitRateConsumption_subscriber_getAuthor_AuthorSearch_value , prob_getAuthor_AuthorRetrievalid * unitRateConsumption_subscriber_getAuthor_AuthorRetrievalid_value];

float: compositionQuota_subscriber_getAuthor_value_calculated = max(compositionQuota_subscriber_getAuthor_value);

float: compositionRate_subscriber_getAuthor_value_calculated = max(compositionRate_subscriber_getAuthor_value);

%% -------- END INNER COMPOSITION DEFINITION --------

%% -------- END getAuthor DEFINITION --------

%% -------- BEGIN getAuthorMetrics DEFINITION --------
	%name: sabius-publication-data
	%operationId: getAuthorMetrics
	%path: /v1/{snapshot}/authors/{authorId}/metrics
	%method: GET

%Mapping
float: mapping_START_getAuthorMetrics = 1;
%% -------- BEGIN DEPENDENCY AuthorRetrievalid OF getAuthorMetrics DEFINITION --------
	%name: scopus
	%operationId: AuthorRetrievalid
	%path: /author/author_id/{author_id}
	%method: GET

%Mapping
float: mapping_getAuthorMetrics_AuthorRetrievalid = 1;
	%BEGIN LIMITS FOR: AuthorRetrievalid
		%Plan: non-subscriber
		float: quota_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_value = 5000;
		float: quota_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_period_val = 1;
		string: quota_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_value = mapping_getAuthorMetrics_AuthorRetrievalid/quota_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_value;
			float: unitQuotaConsumption_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_period_val = 1;
			string: unitQuotaConsumption_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_period_period = "weekly";

		float: rate_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_value = 3;
		float: rate_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_period_val = 1;
		string: rate_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_value = mapping_getAuthorMetrics_AuthorRetrievalid/rate_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_value;
			float: unitRateConsumption_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_period_val = 1;
			string: unitRateConsumption_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_period_period = "secondly";
		%Plan: subscriber
		float: quota_subscriber_getAuthorMetrics_AuthorRetrievalid_value = 5000;
		float: quota_subscriber_getAuthorMetrics_AuthorRetrievalid_period_val = 1;
		string: quota_subscriber_getAuthorMetrics_AuthorRetrievalid_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_subscriber_getAuthorMetrics_AuthorRetrievalid_value = mapping_getAuthorMetrics_AuthorRetrievalid/quota_subscriber_getAuthorMetrics_AuthorRetrievalid_value;
			float: unitQuotaConsumption_subscriber_getAuthorMetrics_AuthorRetrievalid_period_val = 1;
			string: unitQuotaConsumption_subscriber_getAuthorMetrics_AuthorRetrievalid_period_period = "weekly";

		float: rate_subscriber_getAuthorMetrics_AuthorRetrievalid_value = 3;
		float: rate_subscriber_getAuthorMetrics_AuthorRetrievalid_period_val = 1;
		string: rate_subscriber_getAuthorMetrics_AuthorRetrievalid_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_subscriber_getAuthorMetrics_AuthorRetrievalid_value = mapping_getAuthorMetrics_AuthorRetrievalid/rate_subscriber_getAuthorMetrics_AuthorRetrievalid_value;
			float: unitRateConsumption_subscriber_getAuthorMetrics_AuthorRetrievalid_period_val = 1;
			string: unitRateConsumption_subscriber_getAuthorMetrics_AuthorRetrievalid_period_period = "secondly";
	%END LIMITS FOR: AuthorRetrievalid

%% -------- BEGIN INNER COMPOSITION DEFINITION --------
float: prob_getAuthorMetrics_AuthorRetrievalid = 1;

array[int] of float: compositionReq_getAuthorMetrics = [prob_getAuthorMetrics_AuthorRetrievalid * mapping_getAuthorMetrics_AuthorRetrievalid];

float: compositionReq_getAuthorMetrics_calculated = sum(compositionReq_getAuthorMetrics);

array[int] of float: compositionQuota_nonsubscriber_getAuthorMetrics_value = [prob_getAuthorMetrics_AuthorRetrievalid * unitQuotaConsumption_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_value];

array[int] of float: compositionRate_nonsubscriber_getAuthorMetrics_value = [prob_getAuthorMetrics_AuthorRetrievalid * unitRateConsumption_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_value];

float: compositionQuota_nonsubscriber_getAuthorMetrics_value_calculated = max(compositionQuota_nonsubscriber_getAuthorMetrics_value);

float: compositionRate_nonsubscriber_getAuthorMetrics_value_calculated = max(compositionRate_nonsubscriber_getAuthorMetrics_value);

array[int] of float: compositionQuota_subscriber_getAuthorMetrics_value = [prob_getAuthorMetrics_AuthorRetrievalid * unitQuotaConsumption_subscriber_getAuthorMetrics_AuthorRetrievalid_value];

array[int] of float: compositionRate_subscriber_getAuthorMetrics_value = [prob_getAuthorMetrics_AuthorRetrievalid * unitRateConsumption_subscriber_getAuthorMetrics_AuthorRetrievalid_value];

float: compositionQuota_subscriber_getAuthorMetrics_value_calculated = max(compositionQuota_subscriber_getAuthorMetrics_value);

float: compositionRate_subscriber_getAuthorMetrics_value_calculated = max(compositionRate_subscriber_getAuthorMetrics_value);

%% -------- END INNER COMPOSITION DEFINITION --------

%% -------- END getAuthorMetrics DEFINITION --------

%% -------- BEGIN getDocumentsByAuthor DEFINITION --------
	%name: sabius-publication-data
	%operationId: getDocumentsByAuthor
	%path: /v1/{snapshot}/authors/{authorId}/documents
	%method: GET

%Mapping
float: mapping_START_getDocumentsByAuthor = 1;
%% -------- BEGIN DEPENDENCY ScopusSearch OF getDocumentsByAuthor DEFINITION --------
	%name: scopus
	%operationId: ScopusSearch
	%path: /search/scopus
	%method: GET

%Mapping
float: mapping_getDocumentsByAuthor_ScopusSearch = ceil(numPublications/pageSize);
	%BEGIN LIMITS FOR: ScopusSearch
		%Plan: non-subscriber
		float: quota_nonsubscriber_ScopusSearch_value = 20000;
		float: quota_nonsubscriber_getDocumentsByAuthor_ScopusSearch_value = 20000;
		float: quota_nonsubscriber_getDocumentsByAuthor_ScopusSearch_period_val = 1;
		string: quota_nonsubscriber_getDocumentsByAuthor_ScopusSearch_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_ScopusSearch_value = mapping_getDocumentsByAuthor_ScopusSearch/quota_nonsubscriber_getDocumentsByAuthor_ScopusSearch_value;
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_ScopusSearch_period_val = 1;
			string: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_ScopusSearch_period_period = "weekly";

		float: rate_nonsubscriber_getDocumentsByAuthor_ScopusSearch_value = 6;
		float: rate_nonsubscriber_getDocumentsByAuthor_ScopusSearch_period_val = 1;
		string: rate_nonsubscriber_getDocumentsByAuthor_ScopusSearch_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_nonsubscriber_getDocumentsByAuthor_ScopusSearch_value = mapping_getDocumentsByAuthor_ScopusSearch/rate_nonsubscriber_getDocumentsByAuthor_ScopusSearch_value;
			float: unitRateConsumption_nonsubscriber_getDocumentsByAuthor_ScopusSearch_period_val = 1;
			string: unitRateConsumption_nonsubscriber_getDocumentsByAuthor_ScopusSearch_period_period = "secondly";
		%Plan: subscriber
		float: quota_subscriber_ScopusSearch_value = 20000;
		float: quota_subscriber_getDocumentsByAuthor_ScopusSearch_value = 20000;
		float: quota_subscriber_getDocumentsByAuthor_ScopusSearch_period_val = 1;
		string: quota_subscriber_getDocumentsByAuthor_ScopusSearch_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_ScopusSearch_value = mapping_getDocumentsByAuthor_ScopusSearch/quota_subscriber_getDocumentsByAuthor_ScopusSearch_value;
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_ScopusSearch_period_val = 1;
			string: unitQuotaConsumption_subscriber_getDocumentsByAuthor_ScopusSearch_period_period = "weekly";

		float: rate_subscriber_getDocumentsByAuthor_ScopusSearch_value = 6;
		float: rate_subscriber_getDocumentsByAuthor_ScopusSearch_period_val = 1;
		string: rate_subscriber_getDocumentsByAuthor_ScopusSearch_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_subscriber_getDocumentsByAuthor_ScopusSearch_value = mapping_getDocumentsByAuthor_ScopusSearch/rate_subscriber_getDocumentsByAuthor_ScopusSearch_value;
			float: unitRateConsumption_subscriber_getDocumentsByAuthor_ScopusSearch_period_val = 1;
			string: unitRateConsumption_subscriber_getDocumentsByAuthor_ScopusSearch_period_period = "secondly";
	%END LIMITS FOR: ScopusSearch

%% -------- BEGIN DEPENDENCY AbstractRetrieval4 OF getDocumentsByAuthor DEFINITION --------
	%name: scopus
	%operationId: AbstractRetrieval4
	%path: /abstract/scopus_id/{scopus_id}
	%method: GET

%Mapping
float: mapping_getDocumentsByAuthor_AbstractRetrieval4 = numPublications;
	%BEGIN LIMITS FOR: AbstractRetrieval4
		%Plan: non-subscriber
		float: quota_nonsubscriber_AbstractRetrieval4_value = 10000;
		float: quota_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_value = 10000;
		float: quota_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_period_val = 1;
		string: quota_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_value = mapping_getDocumentsByAuthor_AbstractRetrieval4/quota_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_value;
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_period_val = 1;
			string: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_period_period = "weekly";

		float: rate_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_value = 6;
		float: rate_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_period_val = 1;
		string: rate_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_value = mapping_getDocumentsByAuthor_AbstractRetrieval4/rate_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_value;
			float: unitRateConsumption_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_period_val = 1;
			string: unitRateConsumption_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_period_period = "secondly";
		%Plan: subscriber
		float: quota_subscriber_AbstractRetrieval4_value = 10000;
		float: quota_subscriber_getDocumentsByAuthor_AbstractRetrieval4_value = 10000;
		float: quota_subscriber_getDocumentsByAuthor_AbstractRetrieval4_period_val = 1;
		string: quota_subscriber_getDocumentsByAuthor_AbstractRetrieval4_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_AbstractRetrieval4_value = mapping_getDocumentsByAuthor_AbstractRetrieval4/quota_subscriber_getDocumentsByAuthor_AbstractRetrieval4_value;
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_AbstractRetrieval4_period_val = 1;
			string: unitQuotaConsumption_subscriber_getDocumentsByAuthor_AbstractRetrieval4_period_period = "weekly";

		float: rate_subscriber_getDocumentsByAuthor_AbstractRetrieval4_value = 6;
		float: rate_subscriber_getDocumentsByAuthor_AbstractRetrieval4_period_val = 1;
		string: rate_subscriber_getDocumentsByAuthor_AbstractRetrieval4_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_subscriber_getDocumentsByAuthor_AbstractRetrieval4_value = mapping_getDocumentsByAuthor_AbstractRetrieval4/rate_subscriber_getDocumentsByAuthor_AbstractRetrieval4_value;
			float: unitRateConsumption_subscriber_getDocumentsByAuthor_AbstractRetrieval4_period_val = 1;
			string: unitRateConsumption_subscriber_getDocumentsByAuthor_AbstractRetrieval4_period_period = "secondly";
	%END LIMITS FOR: AbstractRetrieval4

%% -------- BEGIN DEPENDENCY SerialTitleMetadata OF getDocumentsByAuthor DEFINITION --------
	%name: scopus
	%operationId: SerialTitleMetadata
	%path: /serial/title/issn/{issn}
	%method: GET

%Mapping
float: mapping_getDocumentsByAuthor_SerialTitleMetadata = numPublicationsTypeJournal;
	%BEGIN LIMITS FOR: SerialTitleMetadata
		%Plan: non-subscriber
		float: quota_nonsubscriber_SerialTitleMetadata_value = 20000;
		float: quota_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_value = 20000;
		float: quota_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_period_val = 1;
		string: quota_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_value = mapping_getDocumentsByAuthor_SerialTitleMetadata/quota_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_value;
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_period_val = 1;
			string: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_period_period = "weekly";

		float: rate_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_value = 3;
		float: rate_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_period_val = 1;
		string: rate_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_value = mapping_getDocumentsByAuthor_SerialTitleMetadata/rate_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_value;
			float: unitRateConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_period_val = 1;
			string: unitRateConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_period_period = "secondly";
		%Plan: subscriber
		float: quota_subscriber_SerialTitleMetadata_value = 20000;
		float: quota_subscriber_getDocumentsByAuthor_SerialTitleMetadata_value = 20000;
		float: quota_subscriber_getDocumentsByAuthor_SerialTitleMetadata_period_val = 1;
		string: quota_subscriber_getDocumentsByAuthor_SerialTitleMetadata_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleMetadata_value = mapping_getDocumentsByAuthor_SerialTitleMetadata/quota_subscriber_getDocumentsByAuthor_SerialTitleMetadata_value;
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleMetadata_period_val = 1;
			string: unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleMetadata_period_period = "weekly";

		float: rate_subscriber_getDocumentsByAuthor_SerialTitleMetadata_value = 3;
		float: rate_subscriber_getDocumentsByAuthor_SerialTitleMetadata_period_val = 1;
		string: rate_subscriber_getDocumentsByAuthor_SerialTitleMetadata_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_subscriber_getDocumentsByAuthor_SerialTitleMetadata_value = mapping_getDocumentsByAuthor_SerialTitleMetadata/rate_subscriber_getDocumentsByAuthor_SerialTitleMetadata_value;
			float: unitRateConsumption_subscriber_getDocumentsByAuthor_SerialTitleMetadata_period_val = 1;
			string: unitRateConsumption_subscriber_getDocumentsByAuthor_SerialTitleMetadata_period_period = "secondly";
	%END LIMITS FOR: SerialTitleMetadata

%% -------- BEGIN DEPENDENCY SerialTitleSearch OF getDocumentsByAuthor DEFINITION --------
	%name: scopus
	%operationId: SerialTitleSearch
	%path: /serial/title
	%method: GET

%Mapping
float: mapping_getDocumentsByAuthor_SerialTitleSearch = numPublicationsTypeConference;
	%BEGIN LIMITS FOR: SerialTitleSearch
		%Plan: non-subscriber
		float: quota_nonsubscriber_SerialTitleSearch_value = 20000;
		float: quota_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_value = 20000;
		float: quota_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_period_val = 1;
		string: quota_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_value = mapping_getDocumentsByAuthor_SerialTitleSearch/quota_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_value;
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_period_val = 1;
			string: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_period_period = "weekly";

		float: rate_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_value = 3;
		float: rate_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_period_val = 1;
		string: rate_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_value = mapping_getDocumentsByAuthor_SerialTitleSearch/rate_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_value;
			float: unitRateConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_period_val = 1;
			string: unitRateConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_period_period = "secondly";
		%Plan: subscriber
		float: quota_subscriber_SerialTitleSearch_value = 20000;
		float: quota_subscriber_getDocumentsByAuthor_SerialTitleSearch_value = 20000;
		float: quota_subscriber_getDocumentsByAuthor_SerialTitleSearch_period_val = 1;
		string: quota_subscriber_getDocumentsByAuthor_SerialTitleSearch_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleSearch_value = mapping_getDocumentsByAuthor_SerialTitleSearch/quota_subscriber_getDocumentsByAuthor_SerialTitleSearch_value;
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleSearch_period_val = 1;
			string: unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleSearch_period_period = "weekly";

		float: rate_subscriber_getDocumentsByAuthor_SerialTitleSearch_value = 3;
		float: rate_subscriber_getDocumentsByAuthor_SerialTitleSearch_period_val = 1;
		string: rate_subscriber_getDocumentsByAuthor_SerialTitleSearch_period_period = "secondly";

			%Unit rate consumption
			float: unitRateConsumption_subscriber_getDocumentsByAuthor_SerialTitleSearch_value = mapping_getDocumentsByAuthor_SerialTitleSearch/rate_subscriber_getDocumentsByAuthor_SerialTitleSearch_value;
			float: unitRateConsumption_subscriber_getDocumentsByAuthor_SerialTitleSearch_period_val = 1;
			string: unitRateConsumption_subscriber_getDocumentsByAuthor_SerialTitleSearch_period_period = "secondly";
	%END LIMITS FOR: SerialTitleSearch

%% -------- BEGIN INNER COMPOSITION DEFINITION --------
float: prob_getDocumentsByAuthor_ScopusSearch = 1;
float: prob_getDocumentsByAuthor_AbstractRetrieval4 = 1;
float: prob_getDocumentsByAuthor_SerialTitleMetadata = numPublicationsTypeJournal/numPublications;
float: prob_getDocumentsByAuthor_SerialTitleSearch = numPublicationsTypeConference/numPublications;

array[int] of float: compositionReq_getDocumentsByAuthor = [prob_getDocumentsByAuthor_ScopusSearch * mapping_getDocumentsByAuthor_ScopusSearch , prob_getDocumentsByAuthor_AbstractRetrieval4 * mapping_getDocumentsByAuthor_AbstractRetrieval4 , prob_getDocumentsByAuthor_SerialTitleMetadata * mapping_getDocumentsByAuthor_SerialTitleMetadata , prob_getDocumentsByAuthor_SerialTitleSearch * mapping_getDocumentsByAuthor_SerialTitleSearch];

float: compositionReq_getDocumentsByAuthor_calculated = sum(compositionReq_getDocumentsByAuthor);

array[int] of float: compositionQuota_nonsubscriber_getDocumentsByAuthor_value = [prob_getDocumentsByAuthor_ScopusSearch * unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_ScopusSearch_value , prob_getDocumentsByAuthor_AbstractRetrieval4 * unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_value , prob_getDocumentsByAuthor_SerialTitleMetadata * unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_value , prob_getDocumentsByAuthor_SerialTitleSearch * unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_value];

array[int] of float: compositionRate_nonsubscriber_getDocumentsByAuthor_value = [prob_getDocumentsByAuthor_ScopusSearch * unitRateConsumption_nonsubscriber_getDocumentsByAuthor_ScopusSearch_value , prob_getDocumentsByAuthor_AbstractRetrieval4 * unitRateConsumption_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_value , prob_getDocumentsByAuthor_SerialTitleMetadata * unitRateConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_value , prob_getDocumentsByAuthor_SerialTitleSearch * unitRateConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_value];

float: compositionQuota_nonsubscriber_getDocumentsByAuthor_value_calculated = max(compositionQuota_nonsubscriber_getDocumentsByAuthor_value);

float: compositionRate_nonsubscriber_getDocumentsByAuthor_value_calculated = max(compositionRate_nonsubscriber_getDocumentsByAuthor_value);

array[int] of float: compositionQuota_subscriber_getDocumentsByAuthor_value = [prob_getDocumentsByAuthor_ScopusSearch * unitQuotaConsumption_subscriber_getDocumentsByAuthor_ScopusSearch_value , prob_getDocumentsByAuthor_AbstractRetrieval4 * unitQuotaConsumption_subscriber_getDocumentsByAuthor_AbstractRetrieval4_value , prob_getDocumentsByAuthor_SerialTitleMetadata * unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleMetadata_value , prob_getDocumentsByAuthor_SerialTitleSearch * unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleSearch_value];

array[int] of float: compositionRate_subscriber_getDocumentsByAuthor_value = [prob_getDocumentsByAuthor_ScopusSearch * unitRateConsumption_subscriber_getDocumentsByAuthor_ScopusSearch_value , prob_getDocumentsByAuthor_AbstractRetrieval4 * unitRateConsumption_subscriber_getDocumentsByAuthor_AbstractRetrieval4_value , prob_getDocumentsByAuthor_SerialTitleMetadata * unitRateConsumption_subscriber_getDocumentsByAuthor_SerialTitleMetadata_value , prob_getDocumentsByAuthor_SerialTitleSearch * unitRateConsumption_subscriber_getDocumentsByAuthor_SerialTitleSearch_value];

float: compositionQuota_subscriber_getDocumentsByAuthor_value_calculated = max(compositionQuota_subscriber_getDocumentsByAuthor_value);

float: compositionRate_subscriber_getDocumentsByAuthor_value_calculated = max(compositionRate_subscriber_getDocumentsByAuthor_value);

%% -------- END INNER COMPOSITION DEFINITION --------

%% -------- END getDocumentsByAuthor DEFINITION --------

%% -------- END SERVICES DEFINITION --------

%% -------- BEGIN OUTER COMPOSITION DEFINITION --------
float: prob_getAuthor = 1;
float: prob_getAuthorMetrics = 1;
float: prob_getDocumentsByAuthor = 1;

array[int] of float: compositionReq = [prob_getAuthor * compositionReq_getAuthor_calculated , prob_getAuthorMetrics * compositionReq_getAuthorMetrics_calculated , prob_getDocumentsByAuthor * compositionReq_getDocumentsByAuthor_calculated];

float: compositionReq_calculated = sum(compositionReq);

array[int] of float: compositionQuota_nonsubscriber = [prob_getAuthor * compositionQuota_nonsubscriber_getAuthor_value_calculated , prob_getAuthorMetrics * compositionQuota_nonsubscriber_getAuthorMetrics_value_calculated , prob_getDocumentsByAuthor * compositionQuota_nonsubscriber_getDocumentsByAuthor_value_calculated];

array[int] of float: compositionRate_nonsubscriber = [prob_getAuthor * compositionRate_nonsubscriber_getAuthor_value_calculated , prob_getAuthorMetrics * compositionRate_nonsubscriber_getAuthorMetrics_value_calculated , prob_getDocumentsByAuthor * compositionRate_nonsubscriber_getDocumentsByAuthor_value_calculated];

float: compositionQuota_nonsubscriber_calculated = max(compositionQuota_nonsubscriber);

float: compositionRate_nonsubscriber_calculated = max(compositionRate_nonsubscriber);

array[int] of float: compositionQuota_subscriber = [prob_getAuthor * compositionQuota_subscriber_getAuthor_value_calculated , prob_getAuthorMetrics * compositionQuota_subscriber_getAuthorMetrics_value_calculated , prob_getDocumentsByAuthor * compositionQuota_subscriber_getDocumentsByAuthor_value_calculated];

array[int] of float: compositionRate_subscriber = [prob_getAuthor * compositionRate_subscriber_getAuthor_value_calculated , prob_getAuthorMetrics * compositionRate_subscriber_getAuthorMetrics_value_calculated , prob_getDocumentsByAuthor * compositionRate_subscriber_getDocumentsByAuthor_value_calculated];

float: compositionQuota_subscriber_calculated = max(compositionQuota_subscriber);

float: compositionRate_subscriber_calculated = max(compositionRate_subscriber);

%% -------- END OUTER COMPOSITION DEFINITION --------




%% -------- BEGIN QUESTIONS DEFINITION --------
	%% -------- BEGIN MODULE 5: "full csp" --------

var int: researchers_subscriber_maximize;
constraint  researchers_subscriber_maximize >= 0;

constraint  researchers_subscriber_maximize * mapping_START_getAuthor * mapping_getAuthor_AuthorSearch  <= quota_subscriber_AuthorSearch_value;
output ["researchers_subscriber_maximize * mapping_START_getAuthor * mapping_getAuthor_AuthorSearch = ",show(researchers_subscriber_maximize * mapping_START_getAuthor * mapping_getAuthor_AuthorSearch)];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["mapping_START_getAuthor = ",show(mapping_START_getAuthor)];
output ["\n"];
output ["mapping_getAuthor_AuthorSearch = ",show(mapping_getAuthor_AuthorSearch)];
output ["\n"];
output ["quota_subscriber_AuthorSearch_value = ",show(quota_subscriber_AuthorSearch_value)];
output ["\n"];
output ["\n"];


constraint  researchers_subscriber_maximize * mapping_START_getAuthor * mapping_getAuthor_AuthorRetrievalid  <= quota_subscriber_AuthorRetrievalid_value;
output ["researchers_subscriber_maximize * mapping_START_getAuthor * mapping_getAuthor_AuthorRetrievalid = ",show(researchers_subscriber_maximize * mapping_START_getAuthor * mapping_getAuthor_AuthorRetrievalid)];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["mapping_START_getAuthor = ",show(mapping_START_getAuthor)];
output ["\n"];
output ["mapping_getAuthor_AuthorRetrievalid = ",show(mapping_getAuthor_AuthorRetrievalid)];
output ["\n"];
output ["quota_subscriber_AuthorRetrievalid_value = ",show(quota_subscriber_AuthorRetrievalid_value)];
output ["\n"];
output ["\n"];


constraint  researchers_subscriber_maximize * mapping_START_getAuthorMetrics * mapping_getAuthorMetrics_AuthorRetrievalid  <= quota_subscriber_AuthorRetrievalid_value;
output ["researchers_subscriber_maximize * mapping_START_getAuthorMetrics * mapping_getAuthorMetrics_AuthorRetrievalid = ",show(researchers_subscriber_maximize * mapping_START_getAuthorMetrics * mapping_getAuthorMetrics_AuthorRetrievalid)];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["mapping_START_getAuthorMetrics = ",show(mapping_START_getAuthorMetrics)];
output ["\n"];
output ["mapping_getAuthorMetrics_AuthorRetrievalid = ",show(mapping_getAuthorMetrics_AuthorRetrievalid)];
output ["\n"];
output ["quota_subscriber_AuthorRetrievalid_value = ",show(quota_subscriber_AuthorRetrievalid_value)];
output ["\n"];
output ["\n"];


constraint  researchers_subscriber_maximize * mapping_START_getAuthor * mapping_getAuthor_AuthorRetrievalid  <= quota_subscriber_AuthorRetrievalid_value;
output ["researchers_subscriber_maximize * mapping_START_getAuthor * mapping_getAuthor_AuthorRetrievalid = ",show(researchers_subscriber_maximize * mapping_START_getAuthor * mapping_getAuthor_AuthorRetrievalid)];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["mapping_START_getAuthor = ",show(mapping_START_getAuthor)];
output ["\n"];
output ["mapping_getAuthor_AuthorRetrievalid = ",show(mapping_getAuthor_AuthorRetrievalid)];
output ["\n"];
output ["quota_subscriber_AuthorRetrievalid_value = ",show(quota_subscriber_AuthorRetrievalid_value)];
output ["\n"];
output ["\n"];


constraint  researchers_subscriber_maximize * mapping_START_getAuthorMetrics * mapping_getAuthorMetrics_AuthorRetrievalid  <= quota_subscriber_AuthorRetrievalid_value;
output ["researchers_subscriber_maximize * mapping_START_getAuthorMetrics * mapping_getAuthorMetrics_AuthorRetrievalid = ",show(researchers_subscriber_maximize * mapping_START_getAuthorMetrics * mapping_getAuthorMetrics_AuthorRetrievalid)];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["mapping_START_getAuthorMetrics = ",show(mapping_START_getAuthorMetrics)];
output ["\n"];
output ["mapping_getAuthorMetrics_AuthorRetrievalid = ",show(mapping_getAuthorMetrics_AuthorRetrievalid)];
output ["\n"];
output ["quota_subscriber_AuthorRetrievalid_value = ",show(quota_subscriber_AuthorRetrievalid_value)];
output ["\n"];
output ["\n"];


constraint  researchers_subscriber_maximize * mapping_START_getDocumentsByAuthor * mapping_getDocumentsByAuthor_ScopusSearch  <= quota_subscriber_ScopusSearch_value;
output ["researchers_subscriber_maximize * mapping_START_getDocumentsByAuthor * mapping_getDocumentsByAuthor_ScopusSearch = ",show(researchers_subscriber_maximize * mapping_START_getDocumentsByAuthor * mapping_getDocumentsByAuthor_ScopusSearch)];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["mapping_START_getDocumentsByAuthor = ",show(mapping_START_getDocumentsByAuthor)];
output ["\n"];
output ["mapping_getDocumentsByAuthor_ScopusSearch = ",show(mapping_getDocumentsByAuthor_ScopusSearch)];
output ["\n"];
output ["quota_subscriber_ScopusSearch_value = ",show(quota_subscriber_ScopusSearch_value)];
output ["\n"];
output ["\n"];


constraint  researchers_subscriber_maximize * mapping_START_getDocumentsByAuthor * mapping_getDocumentsByAuthor_AbstractRetrieval4  <= quota_subscriber_AbstractRetrieval4_value;
output ["researchers_subscriber_maximize * mapping_START_getDocumentsByAuthor * mapping_getDocumentsByAuthor_AbstractRetrieval4 = ",show(researchers_subscriber_maximize * mapping_START_getDocumentsByAuthor * mapping_getDocumentsByAuthor_AbstractRetrieval4)];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["mapping_START_getDocumentsByAuthor = ",show(mapping_START_getDocumentsByAuthor)];
output ["\n"];
output ["mapping_getDocumentsByAuthor_AbstractRetrieval4 = ",show(mapping_getDocumentsByAuthor_AbstractRetrieval4)];
output ["\n"];
output ["quota_subscriber_AbstractRetrieval4_value = ",show(quota_subscriber_AbstractRetrieval4_value)];
output ["\n"];
output ["\n"];


constraint  researchers_subscriber_maximize * mapping_START_getDocumentsByAuthor * mapping_getDocumentsByAuthor_SerialTitleMetadata  <= quota_subscriber_SerialTitleMetadata_value;
output ["researchers_subscriber_maximize * mapping_START_getDocumentsByAuthor * mapping_getDocumentsByAuthor_SerialTitleMetadata = ",show(researchers_subscriber_maximize * mapping_START_getDocumentsByAuthor * mapping_getDocumentsByAuthor_SerialTitleMetadata)];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["mapping_START_getDocumentsByAuthor = ",show(mapping_START_getDocumentsByAuthor)];
output ["\n"];
output ["mapping_getDocumentsByAuthor_SerialTitleMetadata = ",show(mapping_getDocumentsByAuthor_SerialTitleMetadata)];
output ["\n"];
output ["quota_subscriber_SerialTitleMetadata_value = ",show(quota_subscriber_SerialTitleMetadata_value)];
output ["\n"];
output ["\n"];


constraint  researchers_subscriber_maximize * mapping_START_getDocumentsByAuthor * mapping_getDocumentsByAuthor_SerialTitleSearch  <= quota_subscriber_SerialTitleSearch_value;
output ["researchers_subscriber_maximize * mapping_START_getDocumentsByAuthor * mapping_getDocumentsByAuthor_SerialTitleSearch = ",show(researchers_subscriber_maximize * mapping_START_getDocumentsByAuthor * mapping_getDocumentsByAuthor_SerialTitleSearch)];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["mapping_START_getDocumentsByAuthor = ",show(mapping_START_getDocumentsByAuthor)];
output ["\n"];
output ["mapping_getDocumentsByAuthor_SerialTitleSearch = ",show(mapping_getDocumentsByAuthor_SerialTitleSearch)];
output ["\n"];
output ["quota_subscriber_SerialTitleSearch_value = ",show(quota_subscriber_SerialTitleSearch_value)];
output ["\n"];
output ["\n"];


	%Choose ONE solve statement
solve maximize researchers_subscriber_maximize;

output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];

	%% -------- END MODULE 4: "full csp" --------
%% -------- END QUESTIONS DEFINITION --------
