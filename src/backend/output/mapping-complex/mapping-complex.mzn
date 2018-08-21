%% -------- BEGIN CONSTANTS DEFINITION --------
string: sizeVarName = "researchers";
string: selectedPlan = "subscriber";
string: rootOperation = "getReportR00";
float: researchers = 1512;
float: pageSize = 200;
float: numPublications = 37;
float: numPublicationsTypeJournal = 24;
float: numPublicationsTypeConference = 13;
%% -------- END CONSTANTS DEFINITION --------


%% -------- BEGIN SERVICES DEFINITION --------

%% -------- BEGIN getReportR00 DEFINITION --------
	%name: sabius-reports
	%operationId: getReportR00
	%path: /api/reports/r00
	%method: GET

%Mapping
%% -------- BEGIN DEPENDENCY getAuthor OF getReportR00 DEFINITION --------
	%name: sabius-publication-data
	%operationId: getAuthor
	%path: /v1/{snapshot}/authors
	%method: GET

%Mapping
float: count_getReportR00_getAuthor = 1;
	%BEGIN LIMITS FOR: getAuthor
	%END LIMITS FOR: getAuthor

%% -------- BEGIN DEPENDENCY getAuthorMetrics OF getReportR00 DEFINITION --------
	%name: sabius-publication-data
	%operationId: getAuthorMetrics
	%path: /v1/{snapshot}/authors/{authorId}/metrics
	%method: GET

%Mapping
float: count_getReportR00_getAuthorMetrics = 1;
	%BEGIN LIMITS FOR: getAuthorMetrics
	%END LIMITS FOR: getAuthorMetrics

%% -------- BEGIN DEPENDENCY getDocumentsByAuthor OF getReportR00 DEFINITION --------
	%name: sabius-publication-data
	%operationId: getDocumentsByAuthor
	%path: /v1/{snapshot}/authors/{authorId}/documents
	%method: GET

%Mapping
float: count_getReportR00_getDocumentsByAuthor = 1;
	%BEGIN LIMITS FOR: getDocumentsByAuthor
	%END LIMITS FOR: getDocumentsByAuthor

%% -------- BEGIN INNER COMPOSITION DEFINITION --------
%% -------- END INNER COMPOSITION DEFINITION --------

%% -------- END getReportR00 DEFINITION --------

%% -------- BEGIN getAuthor DEFINITION --------
	%name: sabius-publication-data
	%operationId: getAuthor
	%path: /v1/{snapshot}/authors
	%method: GET

%Mapping
%% -------- BEGIN DEPENDENCY AuthorSearch OF getAuthor DEFINITION --------
	%name: scopus
	%operationId: AuthorSearch
	%path: /search/author
	%method: GET

%Mapping
float: count_getAuthor_AuthorSearch = 1;
	%BEGIN LIMITS FOR: AuthorSearch
		%Plan: non-subscriber
		float: quota_nonsubscriber_AuthorSearch_value = 5000;
		float: quota_nonsubscriber_getAuthor_AuthorSearch_value = 5000;
		float: quota_nonsubscriber_getAuthor_AuthorSearch_period_val = 1;
		string: quota_nonsubscriber_getAuthor_AuthorSearch_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_nonsubscriber_getAuthor_AuthorSearch_value = count_getAuthor_AuthorSearch/quota_nonsubscriber_getAuthor_AuthorSearch_value;
			float: unitQuotaConsumption_nonsubscriber_getAuthor_AuthorSearch_period_val = 1;
			string: unitQuotaConsumption_nonsubscriber_getAuthor_AuthorSearch_period_period = "weekly";

		%No rates for plan non-subscriber and path /search/author and method GET
		%Plan: subscriber
		float: quota_subscriber_AuthorSearch_value = 5000;
		float: quota_subscriber_getAuthor_AuthorSearch_value = 5000;
		float: quota_subscriber_getAuthor_AuthorSearch_period_val = 1;
		string: quota_subscriber_getAuthor_AuthorSearch_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_subscriber_getAuthor_AuthorSearch_value = count_getAuthor_AuthorSearch/quota_subscriber_getAuthor_AuthorSearch_value;
			float: unitQuotaConsumption_subscriber_getAuthor_AuthorSearch_period_val = 1;
			string: unitQuotaConsumption_subscriber_getAuthor_AuthorSearch_period_period = "weekly";

		%No rates for plan subscriber and path /search/author and method GET
	%END LIMITS FOR: AuthorSearch

%% -------- BEGIN DEPENDENCY AuthorRetrievalid OF getAuthor DEFINITION --------
	%name: scopus
	%operationId: AuthorRetrievalid
	%path: /author/author_id/{author_id}
	%method: GET

%Mapping
float: count_getAuthor_AuthorRetrievalid = 1;
	%BEGIN LIMITS FOR: AuthorRetrievalid
		%Plan: non-subscriber
		float: quota_nonsubscriber_AuthorRetrievalid_value = 5000;
		float: quota_nonsubscriber_getAuthor_AuthorRetrievalid_value = 5000;
		float: quota_nonsubscriber_getAuthor_AuthorRetrievalid_period_val = 1;
		string: quota_nonsubscriber_getAuthor_AuthorRetrievalid_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_nonsubscriber_getAuthor_AuthorRetrievalid_value = count_getAuthor_AuthorRetrievalid/quota_nonsubscriber_getAuthor_AuthorRetrievalid_value;
			float: unitQuotaConsumption_nonsubscriber_getAuthor_AuthorRetrievalid_period_val = 1;
			string: unitQuotaConsumption_nonsubscriber_getAuthor_AuthorRetrievalid_period_period = "weekly";

		%No rates for plan non-subscriber and path /author/author_id/{author_id} and method GET
		%Plan: subscriber
		float: quota_subscriber_AuthorRetrievalid_value = 5000;
		float: quota_subscriber_getAuthor_AuthorRetrievalid_value = 5000;
		float: quota_subscriber_getAuthor_AuthorRetrievalid_period_val = 1;
		string: quota_subscriber_getAuthor_AuthorRetrievalid_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_subscriber_getAuthor_AuthorRetrievalid_value = count_getAuthor_AuthorRetrievalid/quota_subscriber_getAuthor_AuthorRetrievalid_value;
			float: unitQuotaConsumption_subscriber_getAuthor_AuthorRetrievalid_period_val = 1;
			string: unitQuotaConsumption_subscriber_getAuthor_AuthorRetrievalid_period_period = "weekly";

		%No rates for plan subscriber and path /author/author_id/{author_id} and method GET
	%END LIMITS FOR: AuthorRetrievalid

%% -------- BEGIN INNER COMPOSITION DEFINITION --------
%% -------- END INNER COMPOSITION DEFINITION --------

%% -------- END getAuthor DEFINITION --------

%% -------- BEGIN getAuthorMetrics DEFINITION --------
	%name: sabius-publication-data
	%operationId: getAuthorMetrics
	%path: /v1/{snapshot}/authors/{authorId}/metrics
	%method: GET

%Mapping
%% -------- BEGIN DEPENDENCY AuthorRetrievalid OF getAuthorMetrics DEFINITION --------
	%name: scopus
	%operationId: AuthorRetrievalid
	%path: /author/author_id/{author_id}
	%method: GET

%Mapping
float: count_getAuthorMetrics_AuthorRetrievalid = 1;
	%BEGIN LIMITS FOR: AuthorRetrievalid
		%Plan: non-subscriber
		float: quota_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_value = 5000;
		float: quota_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_period_val = 1;
		string: quota_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_value = count_getAuthorMetrics_AuthorRetrievalid/quota_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_value;
			float: unitQuotaConsumption_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_period_val = 1;
			string: unitQuotaConsumption_nonsubscriber_getAuthorMetrics_AuthorRetrievalid_period_period = "weekly";

		%No rates for plan non-subscriber and path /author/author_id/{author_id} and method GET
		%Plan: subscriber
		float: quota_subscriber_getAuthorMetrics_AuthorRetrievalid_value = 5000;
		float: quota_subscriber_getAuthorMetrics_AuthorRetrievalid_period_val = 1;
		string: quota_subscriber_getAuthorMetrics_AuthorRetrievalid_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_subscriber_getAuthorMetrics_AuthorRetrievalid_value = count_getAuthorMetrics_AuthorRetrievalid/quota_subscriber_getAuthorMetrics_AuthorRetrievalid_value;
			float: unitQuotaConsumption_subscriber_getAuthorMetrics_AuthorRetrievalid_period_val = 1;
			string: unitQuotaConsumption_subscriber_getAuthorMetrics_AuthorRetrievalid_period_period = "weekly";

		%No rates for plan subscriber and path /author/author_id/{author_id} and method GET
	%END LIMITS FOR: AuthorRetrievalid

%% -------- BEGIN INNER COMPOSITION DEFINITION --------
%% -------- END INNER COMPOSITION DEFINITION --------

%% -------- END getAuthorMetrics DEFINITION --------

%% -------- BEGIN getDocumentsByAuthor DEFINITION --------
	%name: sabius-publication-data
	%operationId: getDocumentsByAuthor
	%path: /v1/{snapshot}/authors/{authorId}/documents
	%method: GET

%Mapping
%% -------- BEGIN DEPENDENCY ScopusSearch OF getDocumentsByAuthor DEFINITION --------
	%name: scopus
	%operationId: ScopusSearch
	%path: /search/scopus
	%method: GET

%Mapping
float: count_getDocumentsByAuthor_ScopusSearch = ceil(numPublications/pageSize);
	%BEGIN LIMITS FOR: ScopusSearch
		%Plan: non-subscriber
		float: quota_nonsubscriber_ScopusSearch_value = 20000;
		float: quota_nonsubscriber_getDocumentsByAuthor_ScopusSearch_value = 20000;
		float: quota_nonsubscriber_getDocumentsByAuthor_ScopusSearch_period_val = 1;
		string: quota_nonsubscriber_getDocumentsByAuthor_ScopusSearch_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_ScopusSearch_value = count_getDocumentsByAuthor_ScopusSearch/quota_nonsubscriber_getDocumentsByAuthor_ScopusSearch_value;
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_ScopusSearch_period_val = 1;
			string: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_ScopusSearch_period_period = "weekly";

		%No rates for plan non-subscriber and path /search/scopus and method GET
		%Plan: subscriber
		float: quota_subscriber_ScopusSearch_value = 20000;
		float: quota_subscriber_getDocumentsByAuthor_ScopusSearch_value = 20000;
		float: quota_subscriber_getDocumentsByAuthor_ScopusSearch_period_val = 1;
		string: quota_subscriber_getDocumentsByAuthor_ScopusSearch_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_ScopusSearch_value = count_getDocumentsByAuthor_ScopusSearch/quota_subscriber_getDocumentsByAuthor_ScopusSearch_value;
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_ScopusSearch_period_val = 1;
			string: unitQuotaConsumption_subscriber_getDocumentsByAuthor_ScopusSearch_period_period = "weekly";

		%No rates for plan subscriber and path /search/scopus and method GET
	%END LIMITS FOR: ScopusSearch

%% -------- BEGIN DEPENDENCY AbstractRetrieval4 OF getDocumentsByAuthor DEFINITION --------
	%name: scopus
	%operationId: AbstractRetrieval4
	%path: /abstract/scopus_id/{scopus_id}
	%method: GET

%Mapping
float: count_getDocumentsByAuthor_AbstractRetrieval4 = numPublications;
	%BEGIN LIMITS FOR: AbstractRetrieval4
		%Plan: non-subscriber
		float: quota_nonsubscriber_AbstractRetrieval4_value = 10000;
		float: quota_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_value = 10000;
		float: quota_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_period_val = 1;
		string: quota_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_value = count_getDocumentsByAuthor_AbstractRetrieval4/quota_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_value;
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_period_val = 1;
			string: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_AbstractRetrieval4_period_period = "weekly";

		%No rates for plan non-subscriber and path /abstract/scopus_id/{scopus_id} and method GET
		%Plan: subscriber
		float: quota_subscriber_AbstractRetrieval4_value = 10000;
		float: quota_subscriber_getDocumentsByAuthor_AbstractRetrieval4_value = 10000;
		float: quota_subscriber_getDocumentsByAuthor_AbstractRetrieval4_period_val = 1;
		string: quota_subscriber_getDocumentsByAuthor_AbstractRetrieval4_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_AbstractRetrieval4_value = count_getDocumentsByAuthor_AbstractRetrieval4/quota_subscriber_getDocumentsByAuthor_AbstractRetrieval4_value;
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_AbstractRetrieval4_period_val = 1;
			string: unitQuotaConsumption_subscriber_getDocumentsByAuthor_AbstractRetrieval4_period_period = "weekly";

		%No rates for plan subscriber and path /abstract/scopus_id/{scopus_id} and method GET
	%END LIMITS FOR: AbstractRetrieval4

%% -------- BEGIN DEPENDENCY SerialTitleMetadata OF getDocumentsByAuthor DEFINITION --------
	%name: scopus
	%operationId: SerialTitleMetadata
	%path: /serial/title/issn/{issn}
	%method: GET

%Mapping
float: count_getDocumentsByAuthor_SerialTitleMetadata = numPublicationsTypeJournal;
	%BEGIN LIMITS FOR: SerialTitleMetadata
		%Plan: non-subscriber
		float: quota_nonsubscriber_SerialTitleMetadata_value = 20000;
		float: quota_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_value = 20000;
		float: quota_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_period_val = 1;
		string: quota_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_value = count_getDocumentsByAuthor_SerialTitleMetadata/quota_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_value;
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_period_val = 1;
			string: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleMetadata_period_period = "weekly";

		%No rates for plan non-subscriber and path /serial/title/issn/{issn} and method GET
		%Plan: subscriber
		float: quota_subscriber_SerialTitleMetadata_value = 20000;
		float: quota_subscriber_getDocumentsByAuthor_SerialTitleMetadata_value = 20000;
		float: quota_subscriber_getDocumentsByAuthor_SerialTitleMetadata_period_val = 1;
		string: quota_subscriber_getDocumentsByAuthor_SerialTitleMetadata_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleMetadata_value = count_getDocumentsByAuthor_SerialTitleMetadata/quota_subscriber_getDocumentsByAuthor_SerialTitleMetadata_value;
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleMetadata_period_val = 1;
			string: unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleMetadata_period_period = "weekly";

		%No rates for plan subscriber and path /serial/title/issn/{issn} and method GET
	%END LIMITS FOR: SerialTitleMetadata

%% -------- BEGIN DEPENDENCY SerialTitleSearch OF getDocumentsByAuthor DEFINITION --------
	%name: scopus
	%operationId: SerialTitleSearch
	%path: /serial/title
	%method: GET

%Mapping
float: count_getDocumentsByAuthor_SerialTitleSearch = numPublicationsTypeConference;
	%BEGIN LIMITS FOR: SerialTitleSearch
		%Plan: non-subscriber
		float: quota_nonsubscriber_SerialTitleSearch_value = 20000;
		float: quota_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_value = 20000;
		float: quota_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_period_val = 1;
		string: quota_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_value = count_getDocumentsByAuthor_SerialTitleSearch/quota_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_value;
			float: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_period_val = 1;
			string: unitQuotaConsumption_nonsubscriber_getDocumentsByAuthor_SerialTitleSearch_period_period = "weekly";

		%No rates for plan non-subscriber and path /serial/title and method GET
		%Plan: subscriber
		float: quota_subscriber_SerialTitleSearch_value = 20000;
		float: quota_subscriber_getDocumentsByAuthor_SerialTitleSearch_value = 20000;
		float: quota_subscriber_getDocumentsByAuthor_SerialTitleSearch_period_val = 1;
		string: quota_subscriber_getDocumentsByAuthor_SerialTitleSearch_period_period = "weekly";

			%Unit quota consumption
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleSearch_value = count_getDocumentsByAuthor_SerialTitleSearch/quota_subscriber_getDocumentsByAuthor_SerialTitleSearch_value;
			float: unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleSearch_period_val = 1;
			string: unitQuotaConsumption_subscriber_getDocumentsByAuthor_SerialTitleSearch_period_period = "weekly";

		%No rates for plan subscriber and path /serial/title and method GET
	%END LIMITS FOR: SerialTitleSearch

%% -------- BEGIN INNER COMPOSITION DEFINITION --------
%% -------- END INNER COMPOSITION DEFINITION --------

%% -------- END getDocumentsByAuthor DEFINITION --------

%% -------- END SERVICES DEFINITION --------

%% -------- BEGIN OUTER COMPOSITION DEFINITION --------
%% -------- END OUTER COMPOSITION DEFINITION --------




%% -------- BEGIN QUESTIONS DEFINITION --------
	%% -------- BEGIN MODULE 5: "full csp" --------

var int: researchers_subscriber_maximize;
constraint  researchers_subscriber_maximize >= 0;

constraint researchers_subscriber_maximize * count_getReportR00_getAuthor * count_getAuthor_AuthorSearch <= quota_subscriber_AuthorSearch_value;
output ["researchers_subscriber_maximize * count_getReportR00_getAuthor * count_getAuthor_AuthorSearch = ",show(researchers_subscriber_maximize * count_getReportR00_getAuthor * count_getAuthor_AuthorSearch)];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["count_getReportR00_getAuthor = ",show(count_getReportR00_getAuthor)];
output ["\n"];
output ["count_getAuthor_AuthorSearch = ",show(count_getAuthor_AuthorSearch)];
output ["\n"];
output ["quota_subscriber_AuthorSearch_value = ",show(quota_subscriber_AuthorSearch_value)];
output ["\n"];
output ["\n"];


constraint researchers_subscriber_maximize * ( (  count_getReportR00_getAuthor * count_getAuthor_AuthorRetrievalid  ) + (  count_getReportR00_getAuthorMetrics * count_getAuthorMetrics_AuthorRetrievalid  ) ) <= quota_subscriber_AuthorRetrievalid_value;
output ["researchers_subscriber_maximize * ( (  count_getReportR00_getAuthor * count_getAuthor_AuthorRetrievalid  ) + (  count_getReportR00_getAuthorMetrics * count_getAuthorMetrics_AuthorRetrievalid  ) ) = ",show(researchers_subscriber_maximize * ( (  count_getReportR00_getAuthor * count_getAuthor_AuthorRetrievalid  ) + (  count_getReportR00_getAuthorMetrics * count_getAuthorMetrics_AuthorRetrievalid  ) ))];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["count_getReportR00_getAuthor = ",show(count_getReportR00_getAuthor)];
output ["\n"];
output ["count_getAuthor_AuthorRetrievalid   +   count_getReportR00_getAuthorMetrics = ",show(count_getAuthor_AuthorRetrievalid   +   count_getReportR00_getAuthorMetrics)];
output ["\n"];
output ["count_getAuthorMetrics_AuthorRetrievalid = ",show(count_getAuthorMetrics_AuthorRetrievalid)];
output ["\n"];
output ["quota_subscriber_AuthorRetrievalid_value = ",show(quota_subscriber_AuthorRetrievalid_value)];
output ["\n"];
output ["\n"];


constraint researchers_subscriber_maximize * count_getReportR00_getDocumentsByAuthor * count_getDocumentsByAuthor_ScopusSearch <= quota_subscriber_ScopusSearch_value;
output ["researchers_subscriber_maximize * count_getReportR00_getDocumentsByAuthor * count_getDocumentsByAuthor_ScopusSearch = ",show(researchers_subscriber_maximize * count_getReportR00_getDocumentsByAuthor * count_getDocumentsByAuthor_ScopusSearch)];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["count_getReportR00_getDocumentsByAuthor = ",show(count_getReportR00_getDocumentsByAuthor)];
output ["\n"];
output ["count_getDocumentsByAuthor_ScopusSearch = ",show(count_getDocumentsByAuthor_ScopusSearch)];
output ["\n"];
output ["quota_subscriber_ScopusSearch_value = ",show(quota_subscriber_ScopusSearch_value)];
output ["\n"];
output ["\n"];


constraint researchers_subscriber_maximize * count_getReportR00_getDocumentsByAuthor * count_getDocumentsByAuthor_AbstractRetrieval4 <= quota_subscriber_AbstractRetrieval4_value;
output ["researchers_subscriber_maximize * count_getReportR00_getDocumentsByAuthor * count_getDocumentsByAuthor_AbstractRetrieval4 = ",show(researchers_subscriber_maximize * count_getReportR00_getDocumentsByAuthor * count_getDocumentsByAuthor_AbstractRetrieval4)];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["count_getReportR00_getDocumentsByAuthor = ",show(count_getReportR00_getDocumentsByAuthor)];
output ["\n"];
output ["count_getDocumentsByAuthor_AbstractRetrieval4 = ",show(count_getDocumentsByAuthor_AbstractRetrieval4)];
output ["\n"];
output ["quota_subscriber_AbstractRetrieval4_value = ",show(quota_subscriber_AbstractRetrieval4_value)];
output ["\n"];
output ["\n"];


constraint researchers_subscriber_maximize * count_getReportR00_getDocumentsByAuthor * count_getDocumentsByAuthor_SerialTitleMetadata <= quota_subscriber_SerialTitleMetadata_value;
output ["researchers_subscriber_maximize * count_getReportR00_getDocumentsByAuthor * count_getDocumentsByAuthor_SerialTitleMetadata = ",show(researchers_subscriber_maximize * count_getReportR00_getDocumentsByAuthor * count_getDocumentsByAuthor_SerialTitleMetadata)];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["count_getReportR00_getDocumentsByAuthor = ",show(count_getReportR00_getDocumentsByAuthor)];
output ["\n"];
output ["count_getDocumentsByAuthor_SerialTitleMetadata = ",show(count_getDocumentsByAuthor_SerialTitleMetadata)];
output ["\n"];
output ["quota_subscriber_SerialTitleMetadata_value = ",show(quota_subscriber_SerialTitleMetadata_value)];
output ["\n"];
output ["\n"];


constraint researchers_subscriber_maximize * count_getReportR00_getDocumentsByAuthor * count_getDocumentsByAuthor_SerialTitleSearch <= quota_subscriber_SerialTitleSearch_value;
output ["researchers_subscriber_maximize * count_getReportR00_getDocumentsByAuthor * count_getDocumentsByAuthor_SerialTitleSearch = ",show(researchers_subscriber_maximize * count_getReportR00_getDocumentsByAuthor * count_getDocumentsByAuthor_SerialTitleSearch)];
output ["\n"];
output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];
output ["count_getReportR00_getDocumentsByAuthor = ",show(count_getReportR00_getDocumentsByAuthor)];
output ["\n"];
output ["count_getDocumentsByAuthor_SerialTitleSearch = ",show(count_getDocumentsByAuthor_SerialTitleSearch)];
output ["\n"];
output ["quota_subscriber_SerialTitleSearch_value = ",show(quota_subscriber_SerialTitleSearch_value)];
output ["\n"];
output ["\n"];


	%Choose ONE solve statement
solve maximize researchers_subscriber_maximize;

output ["researchers_subscriber_maximize = ",show(researchers_subscriber_maximize)];
output ["\n"];

	%% -------- END MODULE 4: "full csp " --------
%% -------- END QUESTIONS DEFINITION --------
